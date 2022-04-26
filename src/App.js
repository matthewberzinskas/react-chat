import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

import Homepage from "./components/Homepage";

import "./App.css";

export default function App() {
  const [user] = useAuthState(auth);
  console.log("Welcome", JSON.stringify(user, null, 3));

  return (
    <div className="container bg-dark min-vh-100 min-vw-100">
      <div className="container py-5">
        <div className="d-flex flex-column bg-light text-center">
          <h1>React-Chat</h1>
          <div>
            {user ? (
              <Homepage user={user}/>
            ) : (
              <h2>You do not have permission to view this page.</h2>
            )}
          </div>
          {/*           <section>{user ? <ChatRoom /> : <SignIn />}</section> */}
        </div>
      </div>
    </div>
  );
}
