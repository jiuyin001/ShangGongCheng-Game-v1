const CACHE='garbage-master-v47';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{let c=resp.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c));return resp;})));
});
