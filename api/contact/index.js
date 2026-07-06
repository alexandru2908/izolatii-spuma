const https = require('https');

const MAX_FIELD_LENGTH = 1200;

function clean(value) {
  return String(value || '').trim().slice(0, MAX_FIELD_LENGTH);
}

function sendJson(context, status, body) {
  context.res = {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body
  };
}

function sendResendEmail(payload) {
  const requestBody = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      },
      (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve(data);
            return;
          }

          reject(new Error(`Resend returned ${response.statusCode}: ${data}`));
        });
      }
    );

    request.on('error', reject);
    request.write(requestBody);
    request.end();
  });
}

module.exports = async function (context, req) {
  if (!process.env.RESEND_API_KEY || !process.env.MAIL_TO || !process.env.MAIL_FROM) {
    sendJson(context, 503, {
      ok: false,
      message: 'Serviciul de email nu este configurat încă.'
    });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const name = clean(body.name);
  const phone = clean(body.phone);
  const county = clean(body.county);
  const message = clean(body.message);
  const website = clean(body.website);

  if (website) {
    sendJson(context, 200, { ok: true });
    return;
  }

  if (!name || !phone || !county) {
    sendJson(context, 400, {
      ok: false,
      message: 'Completează numele, telefonul și județul.'
    });
    return;
  }

  const subject = `Cerere ofertă spumă poliuretanică - ${county}`;
  const text = [
    'Ai primit o cerere nouă de ofertă din site.',
    '',
    `Nume: ${name}`,
    `Telefon: ${phone}`,
    `Județ: ${county}`,
    `Detalii: ${message || '-'}`,
    '',
    `Pagină sursă: ${clean(body.page) || '-'}`
  ].join('\n');

  try {
    await sendResendEmail({
      from: process.env.MAIL_FROM,
      to: [process.env.MAIL_TO],
      subject,
      text,
      reply_to: process.env.MAIL_REPLY_TO || process.env.MAIL_TO
    });

    sendJson(context, 200, {
      ok: true,
      message: 'Cererea a fost trimisă. Te contactăm în cel mai scurt timp.'
    });
  } catch (error) {
    context.log.error(error);
    sendJson(context, 502, {
      ok: false,
      message: 'Cererea nu a putut fi trimisă momentan. Te rugăm să ne suni la 0756 528 530.'
    });
  }
};