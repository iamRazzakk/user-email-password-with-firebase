// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBE6Ex6J7UA3Brz1JaKp1qUpJGd2reasgc",
    authDomain: "user-email-password-auth-a6518.firebaseapp.com",
    projectId: "user-email-password-auth-a6518",
    storageBucket: "user-email-password-auth-a6518.appspot.com",
    messagingSenderId: "312864485089",
    appId: "1:312864485089:web:661978a51235e732d811a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;