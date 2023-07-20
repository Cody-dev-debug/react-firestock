import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { useMemo } from "react";
import { Authenticate } from "../../../handlers";
import { SET_USER } from "../../../constants";

const { signIn, signOut } = Authenticate;

const Dropdown = () => {
  const {
    state: { isLoggedIn, currentUser },
    dispatch,
  } = useGlobalContext();
  const navigate = useNavigate();

  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className="rounded-circle"
        style={{ width: "2.25rem", height: "2.25rem" }}
        src={currentUser.photoURL}
        alt={currentUser.displayName}
      />
    ) : null;
  }, [currentUser]);

  const login = () =>
    signIn().then((user) => dispatch({ type: SET_USER, payload: { user } }));

  const logout = () =>
    signOut().then(() => dispatch({ type: SET_USER, payload: { user: "" } }));

  const namePath = currentUser?.displayName
    ?.split(" ")
    ?.join("-")
    ?.toLowerCase();
  return (
    <li className="nav-item dropdown">
      {isLoggedIn ? (
        <div className="d-lg-block d-flex flex-column align-items-center">
          <button
            className="nav-link dropdown-toggle mx-lg-2 mx-0 py-lg-0 py- "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {avatar}
          </button>
          <ul
            className="dropdown-menu shadow end-0"
            style={{ marginTop: "10px", right: "0", left: "auto" }}
          >
            <li>
              <button
                className="dropdown-item"
                onClick={() =>
                  navigate(`/${namePath}/profile`, { replace: true })
                }
              >
                {currentUser.displayName}
              </button>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item" onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button className="nav-link mx-2 w-100" onClick={login}>
          Login
        </button>
      )}
    </li>
  );
};

export default Dropdown;
