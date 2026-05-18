import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    // Replace these with your actual Firebase config from the Firebase Console
    apiKey: "AIzaSyD0o9wer8j-Fn6tOBdlo59D98Q3EajFHz4",
    authDomain: "portfolio-2c7c9.firebaseapp.com",
    databaseURL: "https://portfolio-2c7c9-default-rtdb.firebaseio.com",
    projectId: "portfolio-2c7c9",
    storageBucket: "portfolio-2c7c9.firebasestorage.app",
    messagingSenderId: "319705367078",
    appId: "1:319705367078:web:65d851bbd621ec376a9ce7",
    measurementId: "G-TK911QPF0K"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
