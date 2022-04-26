import { Link } from "react-router-dom";
import SignOut from "./SignOut";

export default function Homepage(props) {
  console.log(props.user);
  let user = props.user;
  return (
    <div className="d-flex flex-column">
      <h1>Welcome {user.displayName}!</h1>
      <Link to="/chat">Go to chat</Link>
      <SignOut />
    </div>
  );
}
