// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf0ItDSFuqsXRsScbCpHzy4C0ZTAicdyA",
  authDomain: "react2-a7d5e.firebaseapp.com",
  projectId: "react2-a7d5e",
  storageBucket: "react2-a7d5e.appspot.com",
  messagingSenderId: "33244414936",
  appId: "1:33244414936:web:f69c8b7f4b50d7a7da28ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);