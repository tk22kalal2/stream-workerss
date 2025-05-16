addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const servers = [
    'nobita-render-koyeb-hdqj.onrender.com',
    'slight-bren-saverestrict-944c9fe5.koyeb.app'
  ];

  const targetHost = servers[Math.floor(Math.random() * servers.length)];

  const url = new URL(request.url);
  url.hostname = targetHost;

  // Clone headers and modify User-Agent / Referer if needed
  const headers = new Headers(request.headers);
  headers.set('User-Agent', 'Mozilla/5.0 (compatible; WorkerBot/1.0)');
  headers.set('Referer', `https://${targetHost}/`);

  const newRequest = new Request(url.toString(), {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
    redirect: 'follow'
  });

  return fetch(newRequest);
}
