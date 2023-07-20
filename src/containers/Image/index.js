import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card } from "../../components";
import { useGlobalContext } from "../../context";

const Image = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useGlobalContext();

  const item = state.items.find((item) => item.id === location.state.id);

  useEffect(() => {
    if (!item) {
      navigate("/*", { replace: true });
    }
  }, [item]);

  return (
    <div className="image">
      <div className="container text-center mt-5">
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="d-flex justify-content-center mb-5">
          <Card file={item ? item : {}} />
        </div>
      </div>
    </div>
  );
};
export default Image;
