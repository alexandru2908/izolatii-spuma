# Izolații Spumă Oltenia

Site static pentru servicii de izolații cu spumă poliuretanică în Dolj, Gorj, Vâlcea, Olt, Teleorman și Mehedinți.

## Structură

- `index.html` - pagina principală cu hartă, servicii, FAQ și formular.
- `judete/*.html` - pagini locale SEO pentru fiecare județ.
- `styles.css` - design responsive și stilurile comune.
- `script.js` - meniu mobil.
- `robots.txt` și `sitemap.xml` - fișiere SEO tehnice.
- `oltenia.jpg.gif` - hartă de referință pentru județele acoperite.

Galeria foto din homepage folosește fotografii reale din lucrări de izolare cu spumă poliuretanică.

## Rulare locală

Poți deschide direct `index.html` în browser sau poți porni un server static:

```bash
python3 -m http.server 4173
```

Apoi deschide `http://localhost:4173/`.

## Hosting pe Azure Static Web Apps

Setări recomandate în Azure Portal:

- `Plan type`: Free pentru început.
- `Region`: West Europe sau North Europe.
- `Deployment source`: GitHub.
- `Repository`: `alexandru2908/izolatii-spuma`.
- `Branch`: `main`.
- `Build preset`: Custom.
- `App location`: `/`.
- `Api location`: gol.
- `Output location`: gol.

Azure va crea automat un workflow GitHub Actions pentru deploy. Fișierul `staticwebapp.config.json` este inclus pentru headers de securitate și tipuri MIME corecte pentru `sitemap.xml` și `robots.txt`.

## Date comerciale

Pentru producție, actualizează datele comerciale atunci când există domeniul și datele finale ale firmei:

- domeniul principal folosit în canonical, OpenGraph, `robots.txt` și `sitemap.xml`.
- numele firmei afișat în site și în datele structurate.
- metoda reală de contact pentru formularul de ofertă.

După schimbarea domeniului, actualizează și `sitemap.xml` plus `robots.txt`.