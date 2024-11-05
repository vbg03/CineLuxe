// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAw7Gnsg8jTjUrAJHH2ClSR77NqT6x_Qwo",
    authDomain: "cinelux-63834.firebaseapp.com",
    projectId: "cinelux-63834",
    storageBucket: "cinelux-63834.firebasestorage.app",
    messagingSenderId: "129760203048",
    appId: "1:129760203048:web:bf7bae530a4cfebc18c01d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }