import firebase from 'firebase/app';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDIAfrHu5tzMyhEPS6j8mGeAZDMD9CfM-M",
    authDomain: "instagram-clone-11358.firebaseapp.com",
    projectId: "instagram-clone-11358",
    storageBucket: "instagram-clone-11358.appspot.com",
    messagingSenderId: "394480357760",
    appId: "1:394480357760:web:177aec5be2e3e18d513165",
    measurementId: "G-T3BG1LXD5D"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default }; 