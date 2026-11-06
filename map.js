// Mapa České republiky s body z places.js; kliknutí otevře /<id>
const border = L.polygon(czBorder);
const czBounds = border.getBounds();

const map = L.map(document.querySelector(".map"), {
  // Nahoře je rezerva navíc, aby se mapa mohla posunout a karta místa u severní hranice se vešla
  maxBounds: L.latLngBounds(
    czBounds.pad(0.1).getSouthWest(),
    [czBounds.getNorth() + 1.5, czBounds.pad(0.1).getEast()],
  ),
  maxBoundsViscosity: 1,
  zoomSnap: 0.25,
  scrollWheelZoom: true,
  dragging: !L.Browser.mobile,
}).fitBounds(czBounds);

// Kolečko myši zoomuje mapu hned; na dotykových zařízeních se tažení aktivuje až kliknutím,
// jinak by mapa blokovala scrollování stránky
const lockMap = () => {
  if (L.Browser.mobile) map.dragging.disable();
};
map.on("click", () => {
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

// Pohled mapy (střed + zoom) se pamatuje, takže po návratu ze stránky místa je mapa stejně přiblížená
const VIEW_KEY = "mapView";
try {
  const v = JSON.parse(sessionStorage.getItem(VIEW_KEY));
  if (v && Number.isFinite(v.lat) && Number.isFinite(v.lng) && Number.isFinite(v.zoom)) {
    map.setView([v.lat, v.lng], v.zoom, { animate: false });
  }
} catch (e) {}
map.on("moveend", () => {
  try {
    const c = map.getCenter();
    sessionStorage.setItem(VIEW_KEY, JSON.stringify({ lat: c.lat, lng: c.lng, zoom: map.getZoom() }));
  } catch (e) {}
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "© přispěvatelé OpenStreetMap",
}).addTo(map);

// Okolí mimo ČR překryje tmavá vrstva (polygon přes celý svět s dírou ve tvaru ČR)
const world = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
];
L.polygon([world, czBorder], {
  stroke: false,
  fillColor: "#0c0b05",
  fillOpacity: 1,
  interactive: false,
}).addTo(map);

L.polyline([...czBorder, czBorder[0]], {
  color: "#b9ae50",
  weight: 2,
  interactive: false,
}).addTo(map);

// Karta místa: obrázek, název a šipka; teprve šipka přesměruje na stránku místa
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// "50.8495258N, 14.2215303E" -> [50.8495258, 14.2215303] (S a W dávají zápornou hodnotu)
const parseGps = (gps) => {
  const parts = String(gps).match(/(-?\d+(?:[.,]\d+)?)\s*°?\s*([NSEW])?/gi) || [];
  const [lat, lng] = parts.map((p) => {
    const m = p.match(/(-?\d+(?:[.,]\d+)?)\s*°?\s*([NSEW])?/i);
    const n = parseFloat(m[1].replace(",", "."));
    return /[SW]/i.test(m[2] || "") ? -Math.abs(n) : n;
  });
  return [lat, lng];
};

// Špendlík jako SVG, aby šla změnit barva
const pinIcon = L.divIcon({
  className: "map-pin",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 41" width="25" height="41">
    <path d="M12.5 0C5.6 0 0 5.6 0 12.5 0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z" fill="#bb41ad" stroke="#fff" stroke-width="1.5"/>
    <circle cx="12.5" cy="12.5" r="4.5" fill="#fff"/>
  </svg>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -36],
});

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
  L.marker(parseGps(place.gps), { title: place.name, icon: pinIcon })
    .addTo(map)
    .bindPopup(card, { className: "place-popup", minWidth: 220, maxWidth: 220 });
});
