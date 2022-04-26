import React, { useEffect, useRef, useState } from "react";
import firebase, { auth, firestore } from "../Firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from './ChatMessage'

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

export default ChatRoom