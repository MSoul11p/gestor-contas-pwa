const V='gestor-v34',CORE=['./','./index.html','./manifest.webmanifest'];
const SKIP=/accounts\.google|googleapis|script\.google|googleusercontent/;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE).catch(()=>{})));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET'||SKIP.test(r.url))return;
  e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));}return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
