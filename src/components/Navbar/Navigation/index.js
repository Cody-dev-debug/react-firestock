import { Dropdown, NavLinks } from "../../../components";
import { useGlobalContext } from "../../../context";
import { SET_SEARCH } from "../../../constants";

const Navigation = () => {
  const {
    state: { search },
    dispatch,
  } = useGlobalContext();

  const handleOnChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch({ type: SET_SEARCH, payload: { search: value.toLowerCase() } });
  };

  return (
    <ul className="navbar-nav text-center ms-auto mb-2 mb-lg-0">
      <NavLinks />
      <form className="d-flex flex-column align-items-center" role="search">
        <input
          className="form-control mx-lg-2 m-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ width: "15rem" }}
          value={search}
          onChange={handleOnChange}
        />
      </form>
      <Dropdown />
    </ul>
  );
};

export default Navigation;
