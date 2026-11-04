// Mapa České republiky s body z places.js; kliknutí otevře /<id>
const border = L.polygon(czBorder);
const czBounds = border.getBounds();

const map = L.map(document.querySelector(".map"), {
  maxBounds: czBounds.pad(0.1),
  maxBoundsViscosity: 1,
  minZoom: 7,
}).fitBounds(czBounds);

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

places.forEach((place) => {
  L.marker([place.lat, place.lng], { title: place.name })
    .addTo(map)
    .bindTooltip(place.name)
    .on("click", () => {
      location.href = `/${encodeURIComponent(place.id)}`;
    });
});
