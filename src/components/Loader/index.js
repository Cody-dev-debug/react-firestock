import React from "react";
import "./styles.css";

const Loader = (props) => {
  const { loading } = props;
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

export default Loader;
