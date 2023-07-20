import { LogoAndName, Navigation } from "../../components";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <LogoAndName />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
