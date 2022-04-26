import { auth } from "../Firebase";

export default function Logout() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}
