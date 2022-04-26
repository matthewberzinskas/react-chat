import React, { useEffect, useRef, useState } from "react";
import "./App.css";

//Firebase Imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

function App() {
  const [user] = useAuthState(auth);
  console.log("Welcome", JSON.stringify(user, null, 2));

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
