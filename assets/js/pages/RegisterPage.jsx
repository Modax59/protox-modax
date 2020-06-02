import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";
import usersAPI from "../services/usersAPI";
import { toast } from "react-toastify";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  //Gestion du changement
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  //Gestion de la soumittion du register
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    const apiError = {};
    if (user.password !== user.passwordConfirm) {
      setBtnLoading(false);
      apiError.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe";
      setErrors(apiError);
      toast.error("Erreur est survenue dans le formulaire 😕");
      return;
    }
    try {
      setBtnLoading(true);
      await usersAPI.register(user);
      toast.success(
        "Vous êtes désormais inscris, vous pouvez vous connecter 😄"
      );
      setErrors({});
      history.replace("/login");
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        violations.map(({ propertyPath, message }) => {
          apiError[propertyPath] = message;
        });
        setErrors(apiError);
        setBtnLoading(false);
        toast.error("Erreur est survenue dans le formulaire 😕");
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-title text-center">
              <h1>Inscription</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Field
                      name="firstName"
                      labelClass="require"
                      label="Prénom"
                      placeholder="Votre Prénom"
                      value={user.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="lastName"
                      labelClass="require"
                      label="Nom"
                      placeholder="Votre Nom"
                      value={user.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                    />
                  </div>
                  <div className="col-md-12">
                    <Field
                      name="email"
                      labelClass="require"
                      label="Adresse Email"
                      placeholder="Votre adresse email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="password"
                      labelClass="require"
                      label="Mot de passe"
                      placeholder="Votre mot de passe"
                      type="password"
                      value={user.password}
                      onChange={handleChange}
                      error={errors.password}
                    />
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="passwordConfirm"
                      labelClass="require"
                      label="Confirmer votre mot de passe"
                      type="password"
                      placeholder="Confirmer votre mot de passe"
                      value={user.passwordConfirm}
                      onChange={handleChange}
                      error={errors.passwordConfirm}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <br />
                    <h5 className="text-light fw-400">&nbsp;</h5>
                    <br />
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Je m'inscris
                      </button>
                      <Link to="/login" className="btn btn-link">
                        Je suis déjà membre !
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
