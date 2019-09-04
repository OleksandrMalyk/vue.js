import firebase from 'firebase/app'

require('firebase/database');
require('firebase/auth');

const config = {
    apiKey: "AIzaSyAJlWDdE3KN0PW5RrlnQ_Qv9HxMgAtXXhg",
    authDomain: "books-a4d07.firebaseapp.com",
    databaseURL: "https://books-a4d07.firebaseio.com",
    projectId: "books-a4d07",
    storageBucket: "",
    messagingSenderId: "960679716358",
    appId: "1:960679716358:web:d4aaf2966723f05f"
};

let firebaseApp = null;
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config)
}

export const firebaseEvents = firebase.database().ref().child('events');

export const firebaseAuth = firebase.auth();
