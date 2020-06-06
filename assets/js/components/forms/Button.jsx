import React from "react";

const Button = ({ loading, children }) => {
  return (
    <button
      type="submit"
      className="btn btn-label btn-success"
      disabled={loading}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            roles="status"
            aria-hidden="true"
          ></span>{" "}
          Chargement...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
