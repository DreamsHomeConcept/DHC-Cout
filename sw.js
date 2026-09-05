/* Dreams Home Concept — Coût de revient
   Fonctionnement hors connexion.

   Ce fichier n'a pas de numéro de version à incrémenter : chaque ouverture
   en ligne va chercher la dernière version des fichiers et remplace ce qui
   est en cache. Vous pouvez remplacer index.html sur GitHub sans rien
   toucher ici. */

const CACHE = 'dhc-cout';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(noms => Promise.all(noms.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(new Request(req.url, { cache: 'reload', credentials: 'same-origin' }))
        .then(rep => {
          const copie = rep.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copie)).catch(() => {});
          return rep;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match(req)))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cachee => {
      const reseau = fetch(req).then(rep => {
        const copie = rep.clone();
        caches.open(CACHE).then(c => c.put(req, copie)).catch(() => {});
        return rep;
      }).catch(() => cachee);
      return cachee || reseau;
    })
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'vider') {
    caches.keys().then(noms => Promise.all(noms.map(n => caches.delete(n))));
  }
});
