import { Link } from "react-router-dom";

import Logout from "./Logout";

export default function Homepage(props) {
  console.log(props.user);
  let user = props.user;
  return (
    <div className="d-flex flex-column">
      <h1>Welcome {user.displayName}!</h1>
      <div className="profile-buttons btn-group-vertical gap-1 p-1">
        <button type="button" className="btn btn-primary">
          <Link to="/chat">Go to Chat</Link>
        </button>
        <Logout />
      </div>

      <div className="row">
        <div className="pic-container col-2">
          {" "}
          <img
            className="profile-pic"
            src={user.photoURL}
            referrerPolicy="no-referrer"
            alt={`of ${user.displayName}`}
          />
        </div>
        <div className="col-10">
          <div className="row text-start">
            <div className="col-4">Display Name:</div>
            <div className="col-8">{user.displayName}</div>
          </div>
          <div className="row text-start">
            <div className="col-4">Email:</div>
            <div className="col-6">{user.email}</div>
            <div className="col-2">
              {user.emailVerified ? (
                <span className="badge bg-success">&#10003;</span>
              ) : (
                <span className="badge bg-danger">&#128500;</span>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
