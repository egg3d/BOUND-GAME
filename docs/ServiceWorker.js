const cacheName = "DefaultCompany-Hopnity-0.1.0";
const contentToCache = [
    "Build/b6e786421e3da27490d3fc2a4bfc2e65.loader.js",
    "Build/664a9a8fa2b64cbbcd40d29533abbc48.framework.js",
    "Build/d411dfdc01383026fff1b4ef27a36cee.data",
    "Build/9c3a12b1ed1e50974d698ce795244e57.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
