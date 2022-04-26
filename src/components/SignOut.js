import {auth} from "../Firebase"

export default SignOut => () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}