import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDBnwxstB5kqv2kftbHkPRqKxIKiYHSyyI",
  authDomain: "plant-scheduler.firebaseapp.com",
  projectId: "plant-scheduler",
  storageBucket: "plant-scheduler.appspot.com",
  messagingSenderId: "592683487390",
  appId: "1:592683487390:web:f66ef11e6259e6c21aeb8f",
  measurementId: "G-WRDPGS0N38"
};

const fire = firebase.initializeApp(firebaseConfig); 
export default fire; 