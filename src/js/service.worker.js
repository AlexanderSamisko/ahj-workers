import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute'
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import Note from './Note';
const bgSyncPluginImage = new BackgroundSyncPlugin('image');
const bgSyncPluginBascket = new BackgroundSyncPlugin('bascket');

const myPlugin = { 
  fetchDidFail: async ({ originalRequest, request, error, event, state }) => {
   const origin = await error;
   if(origin) {
    Note.showNote();
   }
}
}

precacheAndRoute(self.__WB_MANIFEST);

const names = [
  'images',
  'backet'
]


registerRoute(
  ({ url }) => url.origin === 'http://localhost:7040' && url.pathname.startsWith('/bascket'),
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'stories',
    plugins: [
      
      bgSyncPluginBascket,
 
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60 * 60
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
          myPlugin,
    ]
  })
)

registerRoute(
    ({ url }) => url.origin === 'http://localhost:7040' && url.pathname.startsWith('/image'),
    new NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: 'images',
      plugins: [
        
        bgSyncPluginImage,
       
        new ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60 * 60
        }),
        new CacheableResponsePlugin({
          statuses: [0, 200]
        }),
         myPlugin,
      ]
    })
  )

// addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting()
//   }
// })

async function removeOldCache(retain) {
  const keys = await caches.keys();
  return Promise.all(
    keys.filter(key => !retain.includes(key))
    .map(key => caches.delete(key))
  );
}

self.addEventListener('activate', (evt) => {
  evt.waitUntil((async () => {
    await removeOldCache(names);
    await self.clients.claim();
  })());
});
    