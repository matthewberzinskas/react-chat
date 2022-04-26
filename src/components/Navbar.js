import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-light sticky-top bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          React-Chat
        </a>
        <div className="justify-content-end">
          <Link to="/">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
