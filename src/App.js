import React, { useEffect, useRef, useState } from "react";
import "./App.css";

//Firebase Imports
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
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
  console.log("Welcome", JSON.stringify(user, null, 3));

  return (
    <div className="container border">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            React-Chat
          </a>
          <div className="justify-content-end">
            <SignOut />
          </div>
        </div>
      </nav>

      <div className="border">
        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </div>
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
  //Firebase query
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  //Input form
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { displayName, uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    //Reset the form
    setFormValue("");
  };

  //Chat auto-scroll
  const dummy = useRef();
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <div className="messageEntry">
        <form onSubmit={sendMessage}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter your message..."
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              disabled={!formValue}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { displayName, text, uid, photoURL, createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  let created = new Date(createdAt.seconds * 1000).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div class="row border">
        <div class="col-md-2 col-3">
          <img src={photoURL} referrerPolicy="no-referrer" />
        </div>
        <div class="col-md-10 col-9">
          <div class="pb-3">
            <div className={`message ${messageClass}`}>
              <p>{text}</p>
            </div>
          </div>
          <div class="row border">
            <div class="col-md-6 border">Posted By: {displayName}</div>
            <div class="col-md-6 border">At: {created.toString()}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
