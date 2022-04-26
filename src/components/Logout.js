import { auth } from "../Firebase";

export default function Logout() {
  return (
    auth.currentUser && <button type="button" className="btn btn-primary" onClick={() => auth.signOut()}>Sign Out</button>
  );
}
