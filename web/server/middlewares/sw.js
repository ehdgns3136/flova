/**
 * Created by donghoon on 17. 12. 29.
 */
const cacheName = 'v1::static';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        /*
         DEAR READER,
         ADD A LIST OF YOUR ASSETS THAT
         YOU WANT TO WORK WHEN OFFLINE
         TO THIS ARRAY OF URLS
         */
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', function (event) {

});

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = JSON.parse(event.data.text());
    const title = '플로바(Flova)';
    const options = {
      body: data.description,
      icon: data.image,
      // For mobile
      badge: 'https://s3.ap-northeast-2.amazonaws.com/flova/assets/badge.png',
      vibrate: [500, 110, 500],
      data: {
        url: data.url,
      },
    };
    const promiseChain = self.registration.showNotification(title, options);
    event.waitUntil(promiseChain);
  } else {
    console.error('This push event has no data.');
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const promiseChain = self.clients.openWindow(event.notification.data.url);
  event.waitUntil(promiseChain);
});
