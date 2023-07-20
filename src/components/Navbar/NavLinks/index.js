import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../context";

const NavLinks = () => {
  const { pathname } = useLocation();
  const {
    state: { isLoggedIn },
  } = useGlobalContext();
  return (
    <>
      <li className="nav-item">
        <Link
          className={`nav-link ${pathname === "/" ? "active" : ""}`}
          aria-current="page"
          to="/"
        >
          Home
        </Link>
      </li>
      {isLoggedIn && (
        <li className="nav-item">
          <Link
            className={`nav-link ${pathname === "/my-stocks" ? "active" : ""}`}
            aria-current="page"
            to="/my-stocks"
            style={{ whiteSpace: "nowrap" }}
          >
            My Stocks
          </Link>
        </li>
      )}
    </>
  );
};

export default NavLinks;
