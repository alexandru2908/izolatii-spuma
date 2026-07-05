# Izolații Spumă Oltenia

Site static pentru servicii de izolații cu spumă poliuretanică în Dolj, Gorj, Vâlcea, Olt, Teleorman și Mehedinți.

## Structură

- `index.html` - pagina principală cu hartă, servicii, FAQ și formular.
- `judete/*.html` - pagini locale SEO pentru fiecare județ.
- `styles.css` - design responsive și stilurile comune.
- `script.js` - meniu mobil.
- `robots.txt` și `sitemap.xml` - fișiere SEO tehnice.
- `oltenia.jpg.gif` - imaginea primită ca referință.

Galeria foto din homepage folosește imagini externe temporare, potrivite ca direcție vizuală. Pentru lansare, înlocuiește-le cu poze proprii de la lucrări reale, nu cu imagini copiate de pe alte site-uri fără permisiune.

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

## Înainte de publicare

Înlocuiește în toate fișierele:

- `https://victorious-forest-04fbc5f03.7.azurestaticapps.net/` cu domeniul real.
- `0700 000 000` și `+40700000000` cu telefonul real.
- `contact@domeniul-tau.ro` cu emailul real.
- `Izolații Spumă Oltenia` cu numele firmei, dacă este diferit.

După schimbarea domeniului, actualizează și `sitemap.xml` plus `robots.txt`.