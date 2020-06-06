import React, { useContext, useState, useEffect } from "react";
import AuthAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import resetPassAPI from "../services/resetPassAPI";

const Navbar = ({ history }) => {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState();

  const getId = async (email) => {
    try {
      const email = AuthAPI.getEmail();
      const data = await resetPassAPI.EmailToId(email);
      setFirstName(data.firstName.charAt(0).toUpperCase());
      setId(data.id);
    } catch (error) {
      toast.error("Votre profil n'a pas pu etre chargé 😟");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getId(id);
    }
  }, []);

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    toast.info("Vous etes désormais déconnecté 😃");
    history.push("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar bg">
      <NavLink className="navbar-brand py-3" to="/">
        SymReact
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Clients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">
              Factures
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Inscritpion
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">
                  Connexion
                </NavLink>
              </li>{" "}
            </>
          )) || (
            <>
              <li className="nav-item pr-3">
                <NavLink
                  to={"/users/" + id}
                  className="btn btn-primary btn-round"
                >
                  {firstName}
                </NavLink>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger">
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
