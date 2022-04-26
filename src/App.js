import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

import Homepage from "./components/Homepage";
import Login from "./routes/Login";

import "./App.css";

export default function App() {
  const [user] = useAuthState(auth);
  console.log("Welcome", JSON.stringify(user, null, 3));

  return (
    <div className="container min-vh-100 min-vw-100">
      <div className="container py-5">
        <div className="d-flex flex-column text-center border">
          <h1 className="display-4">React-Chat</h1>
          <div>
            {user ? (
              <Homepage user={user} />
            ) : (
              <div className="d-flex flex-column">
                <h2>You do not have permission to view this page.</h2>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
