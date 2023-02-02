// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrsaRgpp10OgxFta1ISIZIbvjxHSxpdDc",
    authDomain: "weightmate-89d31.firebaseapp.com",
    projectId: "weightmate-89d31",
    storageBucket: "weightmate-89d31.appspot.com",
    messagingSenderId: "62641511016",
    appId: "1:62641511016:web:dbc5d6212b40ea08d079dd",
    measurementId: "G-N8WMER9R09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
