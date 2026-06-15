// sw.js — minimal service worker so the site is installable ("Add to
// Home Screen") and works offline as a basic fallback.
//
// Strategy: NETWORK-FIRST. We always try the live network so visitors
// get the newest version; we only fall back to the cached copy if they
// are offline. This avoids ever showing a stale site.

const CACHE = 'ct-cache-v1'

self.addEventListener('install', (e) => {
  self.skipWaiting()
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html'])))
})

self.addEventListener('activate', (e) => {
  // Clean up old caches from previous versions.
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {})
        return res
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  )
})
