import { useContext, useMemo} from "react";
import { Context } from "../../context";
import Authenticate from "../../handlers/authenticate";
import { SET_USER } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"
const { signIn, signOut } = Authenticate

const Navbar = () => {
  const { state:{ isLoggedIn, currentUser }, dispatch} = useContext(Context)
  const navigate = useNavigate()

  const avatar = useMemo(() => {
    return !!currentUser ? (<img className="rounded-circle" style={{ width:"2.25rem", height:"2.25rem"}} src={currentUser.photoURL} alt={currentUser.displayName}/>) : null
  },[currentUser])

  const login = () => {
    signIn().then((user) => dispatch({ type: SET_USER, payload: { user }}))
  }

  const logout = () => {
    signOut().then(() => dispatch({ type: SET_USER, payload: { user:'' }}))
  }

  const namePath = currentUser?.displayName?.split(" ")?.join("-")?.toLowerCase();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="d-flex mb-2 w-100">
          <img src={logo} alt="logo" className="mx-2" style={{ width:"3rem", height:"2.5rem"}}/>
          <a className="navbar-brand" href="/">Firestock</a>
          <button className="navbar-toggler float-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 w-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {
              isLoggedIn && <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/my-stocks" style={{ whiteSpace: "nowrap" }}>My Stocks</Link>
              </li>
            }
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "10rem"}}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <li className="nav-item dropdown">
              {
                isLoggedIn ?
                  (<div>
                    <button className="nav-link dropdown-toggle mx-2 py-0" data-bs-toggle="dropdown" aria-expanded="false">
                      {avatar}
                    </button>
                    <ul className="dropdown-menu shadow end-0" style={{ marginTop: "10px",right: "0",left: "auto" }}>
                      <li>
                        <button className="dropdown-item" onClick={() => navigate(`/${namePath}/profile`,{ replace : true })}>{currentUser.displayName}</button></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item" onClick={logout}>Log Out</button></li>
                    </ul>
                  </div>) : (<button className="nav-link mx-2" onClick={login}>Login</button>)
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;