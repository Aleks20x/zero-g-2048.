const cacheName = 'zero-g-v1';
const assets = ['./', './index.html', './manifest.json'];

// Evento de Instalação
self.addEventListener('install', e => {
  // Força o Service Worker a se tornar o ativo imediatamente, sem esperar as abas fecharem
  self.skipWaiting();
  
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Evento de Ativação (Limpeza de caches antigos)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Evento de Fetch (Recuperação de dados)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
