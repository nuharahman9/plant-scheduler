import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"; 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fire = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL, 
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

export const auth = fire.auth(); 
export const storage = firebase.storage(); 

export default fire;  