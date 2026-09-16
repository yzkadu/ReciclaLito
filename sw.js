/* ReciclaLito — funcionamento sem internet.
   Ao publicar uma alteração, troque o número da VERSAO abaixo.
   Isso faz o celular baixar a versão nova em vez de usar a antiga. */
const VERSAO = 'reciclalito-v16';

const ARQUIVOS = [
  './',
  './index.html',
  './estilo.css',
  './conteudo.js',
  './app.js',
  './manifest.json',
  './fontes/ultra.woff2',
  './fontes/archivo.woff2',
  './fontes/beastly.woff2',
  './fontes/ppneuemontreal-regular.woff2',
  './fontes/ppneuemontreal-medium.woff2',
  './fontes/ppneuemontreal-bold.woff2',
  './icones/icone-192.png',
  './icones/icone-512.png',
  './icones/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Entrega primeiro o que está guardado e só depois procura versão nova.

   O contrário — rede primeiro — parece mais certo, mas trava o app justamente
   onde ele mais é usado. Com sinal fraco o celular não recebe erro: ele fica
   pendurado esperando resposta, às vezes por mais de meio minuto, e a tela não
   abre. Buscando no cache primeiro, o app abre na hora, com ou sem sinal.

   A versão nova baixa por trás e aparece no acesso seguinte. Por isso trocar a
   VERSAO acima continua sendo obrigatório depois de publicar uma mudança. */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;   // não mexe em coisa de fora

  e.respondWith(
    caches.match(e.request).then(guardado => {
      const daRede = fetch(e.request)
        .then(resp => {
          if (resp && resp.ok) {
            const copia = resp.clone();
            caches.open(VERSAO).then(c => c.put(e.request, copia));
          }
          return resp;
        })
        .catch(() => guardado || caches.match('./index.html'));

      /* tem no cache: entrega agora e atualiza por trás.
         não tem: espera a rede, que é a única saída. */
      return guardado || daRede;
    })
  );
});
