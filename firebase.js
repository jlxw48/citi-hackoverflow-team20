import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAhtnQ9BnPXpZSFUolne6Q5GPoGl3wzOC0",
    authDomain: "citi-hackoverflow.firebaseapp.com",
    projectId: "citi-hackoverflow",
    storageBucket: "citi-hackoverflow.appspot.com",
    messagingSenderId: "210996068429",
    appId: "1:210996068429:web:e5eb4dbac18971ff571c04",
    measurementId: "G-3NXYB9X80Z"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
var storage = firebase.storage();
var auth = firebase.auth();

export {
    database,
    storage,
    auth
}
