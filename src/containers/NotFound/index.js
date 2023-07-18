import { useNavigate } from "react-router-dom";
import error from "../../assets/error.png";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <div className="container text-center mt-5">
        <button className="btn btn-link mb-5" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img src={error} alt="Error 404" width={"50%"} />
          <h1 className="text-danger">Looks like you are lost</h1>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
