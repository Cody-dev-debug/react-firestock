import React from "react";
import "./styles.css";

const LoaderOrError = (props) => {
  const { loading, error } = props;
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        props.children
      )}
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default LoaderOrError;
