const CACHE = "game-v1";
const FILES = [
  "./",
  "./index.html",
  "./index.css",
  "./index.js",
  "./gamepage.html",
  "./gamepage.css",
  "./gamepage.js",
  "./instructions.html",
  "./instructions.css",
  "./instructions.js",
  "./congrats.html",
  "./congrats.css",
  "./congrats.js",
  "./colorMap.png",
  "./pin.png",
  "./song.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

