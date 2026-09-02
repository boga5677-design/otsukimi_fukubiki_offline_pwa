const CACHE = "otsukimi-fukubiki-v8-2-force-refresh";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", event => {
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if(event.request.method!=="GET") return;

  const isPage = event.request.mode==="navigate" ||
                 event.request.destination==="document" ||
                 new URL(event.request.url).pathname.endsWith("/index.html");

  if(isPage){
    event.respondWith((async()=>{
      try{
        const fresh=await fetch(event.request,{cache:"no-store"});
        const cache=await caches.open(CACHE);
        cache.put(event.request,fresh.clone());
        cache.put("./index.html",fresh.clone());
        return fresh;
      }catch(e){
        return (await caches.match(event.request)) ||
               (await caches.match("./index.html"));
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached) return cached;
    try{
      const fresh=await fetch(event.request);
      const cache=await caches.open(CACHE);
      cache.put(event.request,fresh.clone());
      return fresh;
    }catch(e){
      return caches.match("./index.html");
    }
  })());
});
