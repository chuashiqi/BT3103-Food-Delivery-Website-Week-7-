import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-O9LP0WkOyh6DMxiKojp1UqlllR28DLU",
    authDomain: "bt3103-week-6-72b62.firebaseapp.com",
    projectId: "bt3103-week-6-72b62",
    storageBucket: "bt3103-week-6-72b62.appspot.com",
    messagingSenderId: "736241821757",
    appId: "1:736241821757:web:d198fb67a87e2446fae254",
    measurementId: "G-WJCM3NCQN4"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;