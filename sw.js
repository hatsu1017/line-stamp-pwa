// スタンプ余白拡張ツール - Service Worker
// アプリ本体をキャッシュし、オフラインでも起動・動作できるようにする。
// 画像処理はもともと全て端末内(このスクリプト内)で完結しており、
// ここでもネットワーク上のサーバーへ画像を送る処理は一切行わない。

const CACHE_NAME = 'line-stamp-pwa-v3';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-152.png',
  './icons/icon-167.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// cache-first, falling back to network, for app-shell files.
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if(cached) return cached;
      return fetch(event.request).then(response => {
        // opportunistically cache same-origin GET responses
        if(response && response.ok && event.request.url.startsWith(self.location.origin)){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
