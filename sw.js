// Service worker tối giản: lưu vỏ app để mở nhanh, dữ liệu luôn lấy mới từ GitHub.
const CACHE = "vta-hub-v1";
const SHELL = ["./", "index.html", "manifest.json", "icon.svg"];
self.addEventListener("install", (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL))));
self.addEventListener("activate", (e) =>
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))));
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // API GitHub: không cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
