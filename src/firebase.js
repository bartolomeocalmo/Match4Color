// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDnsHL2aJFQo9kOMypje7OzYR102bOSvk",
  authDomain: "match4color-11da4.firebaseapp.com",
  projectId: "match4color-11da4",
  storageBucket: "match4color-11da4.appspot.com", // CORRETTO
  messagingSenderId: "771030831803",
  appId: "1:771030831803:web:1f216da1dbae7d24d18f9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
