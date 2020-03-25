this.addEventListener('install', event => {
 event.waitUntil(
  caches.open('shopware-cache').then(function(cache) {
   return cache.addAll([
    'logo.png',
    'offline.html'
   ]);
  })
 );
});

this.addEventListener('fetch', event => {
 if (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html')) {
  event.respondWith(fetch(event.request.url).catch(error => {
   return caches.match('offline.html');
  }));
 } else {
  event.respondWith(caches.match(event.request).then(function (response) {
   return response || fetch(event.request);
  }));
 }
});
