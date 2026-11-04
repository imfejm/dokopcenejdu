// Seznam míst – sem zapisuj nová místa.
// id: krátký název do URL (písmena bez diakritiky, čísla, - a _), stránka bude dokopcenejdu.cz/<id>
// name: název s diakritikou (popisek na mapě, nadpis stránky)
// lat, lng: souřadnice (WGS84, desetinná čísla), např. z mapy.cz nebo Google Maps
// Po přidání místa spusť: node build.js (vytvoří kostru stránky <id>/index.html)
const places = [
  { id: "ukazka", name: "Ukázkové místo", lat: 49.8175, lng: 15.473 },
  // { id: "", name: "", lat: 0, lng: 0 },
];
