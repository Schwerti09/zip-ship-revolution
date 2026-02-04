# ZIP-SHIP Revolution Demo (Static)

Dieses Repo ist absichtlich simpel: **nur HTML/CSS/JS**.

Ziel: Du kannst damit die komplette Pipeline testen:

1. ZIP bei ZipShip hochladen
2. ZipShip erstellt automatisch ein GitHub-Repo
3. Repo bei **Vercel** oder **Netlify** importieren → Deploy

## Dateien

- `index.html` – Landingpage
- `styles.css` – Styling (ohne Frameworks)
- `script.js` – Mini-Interaktionen (Theme Toggle, Copy, Fake-Deploy)
- `netlify.toml` – Publish Root, kein Build
- `vercel.json` – Clean URLs + Cache Header
- `robots.txt`, `sitemap.xml` – Kleines SEO/Deploy-Zubehör

## Lokal testen

Einfach die `index.html` im Browser öffnen.

Optional (wenn du einen lokalen Server willst):

```bash
python -m http.server 8080
# dann http://localhost:8080
```

## Deploy Hinweise

- **Netlify:** sollte ohne Build laufen, Publish ist `.`.
- **Vercel:** Framework = *Other* oder einfach Auto-Detection.

Viel Spaß beim Deploy-Detektivspielen 🕵️‍♂️
