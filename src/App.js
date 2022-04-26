import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import ChatRoom from "./components/ChatRoom";

import "./App.css";

function App() {
  const [user] = useAuthState(auth);
  console.log("Welcome", JSON.stringify(user, null, 3));

  return (
    <div className="container bg-dark min-vh-100 min-vw-100">
      <div className="container py-5">
        <div className="d-flex flex-column bg-light justify-content-center">
          <h1>React-Chat</h1>
          <section>{user ? <ChatRoom /> : <SignIn />}</section>
        </div>
      </div>
    </div>
  );
}

export default App;
