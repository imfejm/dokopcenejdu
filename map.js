// Mapa České republiky s body z places.js; kliknutí otevře /<id>
const border = L.polygon(czBorder);
const czBounds = border.getBounds();

const map = L.map(document.querySelector(".map"), {
  maxBounds: czBounds.pad(0.1),
  maxBoundsViscosity: 1,
  zoomSnap: 0.25,
  scrollWheelZoom: false,
  dragging: !L.Browser.mobile,
}).fitBounds(czBounds);

// Kolečko myši (a na dotykových zařízeních tažení) se v mapě aktivuje až kliknutím,
// jinak by mapa blokovala scrollování stránky
const lockMap = () => {
  map.scrollWheelZoom.disable();
  if (L.Browser.mobile) map.dragging.disable();
};
map.on("click", () => {
  map.scrollWheelZoom.enable();
  map.dragging.enable();
});
map.on("mouseout", lockMap);
document.addEventListener("pointerdown", (e) => {
  if (!map.getContainer().contains(e.target)) lockMap();
});

// Minimální zoom = celá ČR v kontejneru (na mobilu menší než dřívější pevná 7)
const fitZoom = map.getZoom();
map.setMinZoom(fitZoom);
map.on("resize", () => {
  map.setMinZoom(map.getBoundsZoom(czBounds));
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© přispěvatelé OpenStreetMap",
}).addTo(map);

// Okolí mimo ČR překryje světlá vrstva (polygon přes celý svět s dírou ve tvaru ČR)
const world = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
];
L.polygon([world, czBorder], {
  stroke: false,
  fillColor: "#f4f1ea",
  fillOpacity: 1,
  interactive: false,
}).addTo(map);

L.polyline([...czBorder, czBorder[0]], {
  color: "#333",
  weight: 2,
  interactive: false,
}).addTo(map);

// Karta místa: obrázek, název a šipka; teprve šipka přesměruje na stránku místa
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

places.forEach((place) => {
  const url = `/${encodeURIComponent(place.id)}`;
  const card = `
    <div class="place-card">
      ${place.img ? `<img src="${esc(place.img)}" alt="${esc(place.name)}" />` : ""}
      <div class="place-card-row">
        <span class="place-card-name">${esc(place.name)}</span>
        <a class="place-card-go" href="${url}" aria-label="Otevřít ${esc(place.name)}">→</a>
      </div>
    </div>`;
  L.marker([place.lat, place.lng], { title: place.name })
    .addTo(map)
    .bindPopup(card, { className: "place-popup", minWidth: 220, maxWidth: 220 });
});
