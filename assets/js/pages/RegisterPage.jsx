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

  //Gestion du changement
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  //Gestion de la soumittion du register
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiError = {};
    if (user.password !== user.passwordConfirm) {
      apiError.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe";
      setErrors(apiErrors);
      toast.error("Erreur est survenue dans le formulaire 😕");
      return;
    }
    try {
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
        toast.error("Erreur est survenue dans le formulaire 😕");
      }
    }
  };

  return (
    <>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Votre Prénom"
          value={user.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          name="lastName"
          label="Nom"
          placeholder="Votre Nom"
          value={user.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          name="email"
          label="Adresse Email"
          placeholder="Votre adresse email"
          type="email"
          value={user.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Field
          name="password"
          label="Mot de passe"
          placeholder="Votre mot de passe"
          type="password"
          value={user.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Field
          name="passwordConfirm"
          label="Confirmer votre mot de passe"
          type="password"
          placeholder="Confirmer votre mot de passe"
          value={user.passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />

        <div className="form-group">
          <button className="btn btn-success" type="submit">
            Je m'inscris
          </button>
          <Link to="/login" className="btn btn-link">
            Je suis déjà membre !
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
