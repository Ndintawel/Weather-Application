// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzyAgBsNvXULWyK1aKHinA47AV3EOqW30",
  authDomain: "weather-application-11063.firebaseapp.com",
  projectId: "weather-application-11063",
  storageBucket: "weather-application-11063.appspot.com",
  messagingSenderId: "903838999696",
  appId: "1:903838999696:web:e138fdae8408efdecea415",
  measurementId: "G-4JG1EHMBP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider= new GoogleAuthProvider();

export const db=getFirestore(app);
export const storage=getStorage(app);