import React from "react";

const Button = ({
  loading,
  children,
  className = " ",
  btnlabel = " btn-label",
}) => {
  return (
    <button
      type="submit"
      className={"btn btn-success " + className + btnlabel}
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
