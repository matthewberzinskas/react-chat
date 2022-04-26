//Firebase Imports
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBEPDg_DCkaSPUc_Wt2b8EJQJ1TEPCa_Pc",
  authDomain: "react-chat-22.firebaseapp.com",
  projectId: "react-chat-22",
  storageBucket: "react-chat-22.appspot.com",
  messagingSenderId: "679388863489",
  appId: "1:679388863489:web:8bb9f133b5dd292246b400",
  measurementId: "G-Q2E64BE40T",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default firebase
export { auth, firestore }