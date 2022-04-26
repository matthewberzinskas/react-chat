import SignOut from "./SignOut"

export default Navbar => () => {
  return (
    <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        React-Chat
      </a>
      <div className="justify-content-end">
        <SignOut />
      </div>
    </div>
  </nav>
  )
}