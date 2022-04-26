import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";

import firebase, { auth, firestore } from "./Firebase";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);
  console.log("Welcome", JSON.stringify(user, null, 3));

  return (
    <div className="app bg-dark min-vh-100 p-2">
      <div className="container border bg-light">
        <Navbar />
        <div className="border">
          <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
      </div>
    </div>
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
  console.log(JSON.stringify(props.message, null, 3));

  let created;
  if (createdAt !== null) {
    console.log(createdAt.seconds);
    created = new Date(createdAt.seconds * 1000).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <>
      <div
        className={`message d-flex ${
          messageClass === "sent" ? "flex-row" : "flex-row-reverse"
        } border p-2`}
      >
        <div className="text-center col-md-2 col-3 p-1">
          <img src={photoURL} referrerPolicy="no-referrer" />
        </div>
        <div className="col-md-10 col-9 p-1">
          <p>{text}</p>
          <div className="row border p-1">
            <div className="col-md-6 border">Posted By: {displayName}</div>
            <div className="col-md-6 border">At: {created}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
