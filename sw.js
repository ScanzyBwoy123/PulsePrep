const CACHE_NAME = "pulseprep-pwa-v3";

const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/pulseprep.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) =>
            name.startsWith("pulseprep-") &&
            name !== CACHE_NAME
          )
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Never cache external requests or API responses.
  if (url.origin !== self.location.origin) return;

  // Network-first for page navigation.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("./index.html")
      )
    );
    return;
  }

  // Cache only known static app-shell files.
  const isAppShellFile = APP_SHELL.some((path) => {
    const fileUrl = new URL(path, self.registration.scope);
    return fileUrl.href === url.href;
  });

  if (isAppShellFile) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached || fetch(request)
      )
    );
  }
});
