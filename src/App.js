import React from "react";
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

export default App;