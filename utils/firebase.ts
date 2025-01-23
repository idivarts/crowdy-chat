// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log("firebaseConfig", firebaseConfig);


// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export { FirebaseApp };
