// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAxRImAmCC7cxN9F7a6E7GhP7dTw8aSNjc",
    authDomain: "personal-task-manager-af9cd.firebaseapp.com",
    projectId: "personal-task-manager-af9cd",
    storageBucket: "personal-task-manager-af9cd.appspot.com",
    messagingSenderId: "790336115366",
    appId: "1:790336115366:web:0954cc64477a5517f39a67",
    measurementId: "G-BXZ369EZS2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
