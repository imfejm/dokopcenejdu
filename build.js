// Pro každé nové místo z places.js vytvoří kostru <id>/index.html (dokopcenejdu.cz/<id>)
// Existující stránky nepřepisuje – obsah (fotky, popisky) si v nich upravuješ ručně.
// Spuštění: node build.js
const fs = require("fs");
const path = require("path");

const places = new Function(
  fs.readFileSync(path.join(__dirname, "places.js"), "utf8") +
    "; return places;",
)();

const reserved = ["img", "node_modules", ".git"];

places.forEach((place) => {
  if (!/^[A-Za-z0-9_-]+$/.test(place.id) || reserved.includes(place.id)) {
    throw new Error(`Neplatné id: "${place.id}"`);
  }
  const file = path.join(__dirname, place.id, "index.html");
  if (fs.existsSync(file)) {
    console.log(`přeskočeno (už existuje): /${place.id}/`);
    return;
  }
  const html = `<!doctype html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${place.name} – Do kopce nejdu</title>
    <link rel="stylesheet" href="/index.css" />
  </head>
  <body>
    <main>
      <p><a href="/#map">← Zpět na mapu</a></p>
      <h1>${place.name}</h1>
      <!-- TODO fotky a popisky -->
    </main>
  </body>
</html>
`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`vytvořeno: /${place.id}/`);
});
