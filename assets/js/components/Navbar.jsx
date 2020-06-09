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
      <NavLink
        className="navbar-brand  mt-30 pl-100 py-3 h1 text-primary font-effort"
        to="/"
      >
        Prorox
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
        <span className="navbar-toggler-icon">
          <i className="ti-menu"></i>
        </span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item pt-10">
            <NavLink className="nav-link pt-20  pl-50 h3" to="/customers">
              Clients
            </NavLink>
          </li>
          <li className="nav-item pt-10">
            <NavLink className="nav-link pt-20 pl-50 h3" to="/invoices">
              Factures
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto pr-3">
          {(!isAuthenticated && (
            <>
              <li className="nav-item pt-10">
                <NavLink to="/register" className="nav-link h3 pt-2 ">
                  Inscritpion
                </NavLink>
              </li>
              <li className="nav-item pt-10">
                <NavLink to="/login" className="btn btn-lg  btn-primary">
                  Connexion
                </NavLink>
              </li>{" "}
            </>
          )) || (
            <>
              <li className="nav-item pr-3 pt-10 pl-50">
                <NavLink
                  to={"/users/" + id}
                  className="btn btn-lg btn-outline btn-primary"
                >
                  <i className="ti-user"></i> Profil
                </NavLink>
              </li>
              <li className="nav-item pt-10 ">
                <button
                  onClick={handleLogout}
                  className="btn btn-lg  btn-danger"
                >
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
