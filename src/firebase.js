// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "LA_TUA_API_KEY",
  authDomain: "match4color.firebaseapp.com",
  projectId: "match4color",
  storageBucket: "match4color.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
