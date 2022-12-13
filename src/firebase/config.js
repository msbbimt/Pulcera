// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6wAJvOx6L84Szv6kXFichzUwEeWvaZNc",
  authDomain: "pulcera-e067f.firebaseapp.com",
  projectId: "pulcera-e067f",
  storageBucket: "pulcera-e067f.appspot.com",
  messagingSenderId: "61726153547",
  appId: "1:61726153547:web:d2b967c0dbb153cb9ce6ce"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth ( FirebaseApp );
export const FirebaseDB = getFirestore ( FirebaseApp );