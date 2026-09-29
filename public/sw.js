const CACHE = 'ct-pages-v2'
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter(key => key.startsWith('ct-') && key !== CACHE).map(key => caches.delete(key)))
    await self.clients.claim()
  })())
})
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate' ||
      new URL(event.request.url).origin !== self.location.origin) return
  event.respondWith((async () => {
    const cache = await caches.open(CACHE)
    try {
      const response = await fetch(event.request)
      if (response.ok) await cache.put('/index.html', response.clone())
      return response
    } catch {
      return await cache.match('/index.html') || new Response('You are offline. Please reconnect to visit Customized Tees.', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    }
  })())
})
