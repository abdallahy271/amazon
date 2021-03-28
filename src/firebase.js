// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA34juSIOVl1Ts8Ib3gC6SSQZ7dzJJCt7w",
    authDomain: "fir-bcd8c.firebaseapp.com",
    projectId: "fir-bcd8c",
    storageBucket: "fir-bcd8c.appspot.com",
    messagingSenderId: "895236540594",
    appId: "1:895236540594:web:c26f59453872cc89b0e1ab",
    measurementId: "G-3GK6M13ZTG"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };