importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyCCp3OsQ-4bO8cR6NPPGcVagbZBVfkZMp8",
    authDomain: "playoff-turf-management.firebaseapp.com",
    projectId: "playoff-turf-management",
    storageBucket: "playoff-turf-management.appspot.com",
    messagingSenderId: "312664297251",
    appId: "1:312664297251:web:9b1bea696b961dd6304696",
    measurementId: "G-86H8X5FZ5S"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('recieved a message', payload)

    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});
