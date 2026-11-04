// Fotky v .heroimg se postupně zobrazí v náhodném pořadí
const photos = Array.from(document.querySelectorAll(".globe > *"));

// Rovnoměrné rozmístění po kouli (Fibonacciho spirála) a různé velikosti karet
const GOLDEN_ANGLE = 137.508;
const sizes = [1, 0.8, 1.15, 0.9, 1.05, 0.75, 1.1, 0.85, 1];
photos.forEach((photo, i) => {
  const y = 1 - (2 * (i + 0.5)) / photos.length;
  const lat = (Math.asin(y) * 180) / Math.PI;
  photo.style.setProperty("--lon", `${(i * GOLDEN_ANGLE) % 360}deg`);
  photo.style.setProperty("--lat", `${lat}deg`);
  photo.style.setProperty("--s", sizes[i % sizes.length]);
});

// Fisher-Yates zamíchání
for (let i = photos.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [photos[i], photos[j]] = [photos[j], photos[i]];
}

const delay = (index) => 300 + index * 400;

photos.forEach((photo, index) => {
  setTimeout(() => photo.classList.add("visible"), delay(index));
});

// Úvodní text se objeví společně s poslední fotkou
const intro = document.querySelector(".hero > .intro");
const introDelay = delay(photos.length - 1);
setTimeout(() => intro.classList.add("visible"), introDelay);

// Dropdown se objeví až po dokončení zobrazení úvodního textu (1,5 s přechod)
const dropdown = document.querySelector(".dropdown");
setTimeout(() => dropdown.classList.add("visible"), introDelay + 1500);
