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

## Înainte de publicare

Înlocuiește în toate fișierele:

- `https://www.exemplu.ro/` cu domeniul real.
- `0700 000 000` și `+40700000000` cu telefonul real.
- `contact@exemplu.ro` cu emailul real.
- `Izolații Spumă Oltenia` cu numele firmei, dacă este diferit.

După schimbarea domeniului, actualizează și `sitemap.xml` plus `robots.txt`.