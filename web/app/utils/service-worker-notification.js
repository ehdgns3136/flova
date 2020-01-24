/**
 * Created by donghoon on 18. 1. 4.
 */

export function registerServiceWorker() {
  return navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      askNotificationPermission();
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
}

function askNotificationPermission() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      checkSubscriptionExist();
    } else {
      console.error('Notification denied or dismissed by user.');
    }
  });
}

function checkSubscriptionExist() {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    registration.pushManager.getSubscription().then(function(subscription) {
      if (!subscription) {
        subscribeUserToPush();
      }
    });
  });
}

function subscribeUserToPush() {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      const publicKey = VAPID_PUBLIC_KEY;
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          publicKey
        ),
      };
      return registration.pushManager.subscribe(subscribeOptions);
    }).then(function(pushSubscription) {
      sendSubscriptionToBackEnd(pushSubscription);
    }).catch(function(err) {
      console.error('Unable to push subscription to user', err);
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

function sendSubscriptionToBackEnd(pushSubscription) {
  fetch(`${API_ROOT}/user/save_subscription/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pushSubscription),
  });
}

export function unsubscribeClient() {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    registration.pushManager.getSubscription().then(function(subscription) {
      if (subscription) {
        deleteSubscriptionFromBackEnd(subscription.endpoint);
        subscription.unsubscribe().then(function(successful) {
        }).catch(function(e) {
          console.error('unsubscription failed', e);
        });
      }
    });
  });
}

function deleteSubscriptionFromBackEnd(endpoint) {
  fetch(`${API_ROOT}/user/delete_subscription/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(endpoint),
  });
  localStorage.removeItem('token');
}
