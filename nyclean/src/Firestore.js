import firebase from 'firebase';

  var firebaseConfig = {
    apiKey: "AIzaSyBDb9uAt7yL4NRP9RXssJLDNZcTkZkgvXk",
    authDomain: "logbag-da7d6.firebaseapp.com",
    databaseURL: "https://logbag-da7d6.firebaseio.com",
    projectId: "logbag-da7d6",
    storageBucket: "",
    messagingSenderId: "540407765535",
    appId: "1:540407765535:web:0e1aac9e47e0a4de"
  };
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
