import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase"; 


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fire = firebase.initializeApp({
  apiKey: "AIzaSyDBnwxstB5kqv2kftbHkPRqKxIKiYHSyyI",
  authDomain: "plant-scheduler.firebaseapp.com",
  projectId: "plant-scheduler",
  storageBucket: "plant-scheduler.appspot.com",
  messagingSenderId: "592683487390",
  appId: "1:592683487390:web:f66ef11e6259e6c21aeb8f",
  measurementId: "G-WRDPGS0N38"
});

export const auth = fire.auth(); 
//const storage = firebase.storage(); 

export default fire; 