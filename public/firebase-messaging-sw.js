// firebase-messaging-sw.js

// ✅ Firebase CDN scripts for service workers (no ES6 import/export needed)
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBtD7Df_L_5YPHB9opV-KGZsjzISkIvN9M",
  authDomain: "dejair-49f35.firebaseapp.com",
  projectId: "dejair-49f35",
  messagingSenderId: "186331542288",
  appId: "1:186331542288:web:afbb765e2e402f5648ab95"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
