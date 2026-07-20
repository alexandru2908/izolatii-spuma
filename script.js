const menuButton = document.querySelector('.menu-toggle');
const mainMenu = document.querySelector('#main-menu');

if (menuButton && mainMenu) {
  menuButton.addEventListener('click', () => {
    const isOpen = mainMenu.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mainMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mainMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm instanceof HTMLFormElement) {
  const statusMessage = contactForm.querySelector('[data-form-status]');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!(submitButton instanceof HTMLButtonElement)) {
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      name: String(formData.get('Nume') || ''),
      phone: String(formData.get('Telefon') || ''),
      county: String(formData.get('Judet') || ''),
      message: String(formData.get('Detalii') || ''),
      website: String(formData.get('website') || ''),
      page: window.location.href
    };

    submitButton.disabled = true;
    submitButton.textContent = 'Se trimite...';
    if (statusMessage) {
      statusMessage.textContent = '';
      statusMessage.className = 'form-status';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'Cererea nu a putut fi trimisă.');
      }

      contactForm.reset();
      if (statusMessage) {
        statusMessage.textContent = result.message || 'Cererea a fost trimisă.';
        statusMessage.classList.add('is-success');
      }
    } catch (error) {
      if (statusMessage) {
        statusMessage.textContent = error.message || 'Cererea nu a putut fi trimisă. Sună-ne la 0756 528 530.';
        statusMessage.classList.add('is-error');
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Trimite cererea';
    }
  });
}

document.querySelectorAll('.video-facade').forEach((facade) => {
  facade.addEventListener('click', () => {
    const id = facade.dataset.yt;
    if (!id) {
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = 'Video: aplicare spumă poliuretanică';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  });
});