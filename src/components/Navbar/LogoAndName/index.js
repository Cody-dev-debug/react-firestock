import { Link } from "react-router-dom";

import logo from "../../../assets/logo.png";

const LogoAndName = () => {
  return (
    <div className="d-flex mb-2 w-100 justify-content-lg-start justify-content-between">
      <img
        src={logo}
        alt="logo"
        className="mx-2"
        style={{ width: "3rem", height: "2.5rem" }}
      />
      <Link className="navbar-brand m-0" to="/">
        Firestock
      </Link>
      <button
        className="navbar-toggler float-end"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  );
};

export default LogoAndName;
