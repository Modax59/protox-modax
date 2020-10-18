import React, { useState, useEffect } from "react";
import axios from "axios";
import Field from "../components/forms/Field";
import Button from "../components/forms/Button";
import { toast } from "react-toastify";
import resetPassAPI from "../services/resetPassAPI";
import { Redirect } from "react-router-dom";

const ResetPassPage = ({ history, match }) => {
  const [user, setUser] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [userC, setUserC] = useState({
    password: "",
  });
  const [error, setError] = useState({
    password: "",
    passwordConfirm: "",
  });

  //Recupere le token dans la bar d'url
  const token = match.params.token;
  const [btnLoading, setBtnLoading] = useState(false);
  const [errorBadToken, setErrorBadToken] = useState(false);
  const [id, setId] = useState();
  const [editing, setEditing] = useState(false);

  //Recupere les informations du nouveau mot de passe
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
    setUserC({ password: value });
  };

  //Effet a chaque changement du token dans la bar d'url
  useEffect(() => {
      tokenIsValid(token);
  }, [token]);

  //Recupère l'utilisateur lié au token
  const tokenIsValid = async (token) => {
    try {
      const response = await resetPassAPI.tokenIsValid(token);
      const BadToken = response.data["hydra:member"];
      setEditing(true);
      setId(response.data.id);
      if (BadToken[0] === "notValide") {
        setErrorBadToken(true);
        toast.error(
          "Erreur est survenue dans le formulaire (Le token n'existe plus ou à expiré) 😕"
        );
        setEditing(false);
        return;

      }
      setEditing(true);
    } catch (error) {
      setEditing(false);
    }
  };

  //Gestion du submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    const apiError = {};
    if (user.password === "") {
      setBtnLoading(false);
      apiError.password = "Votre mot de passe ne peut pas etre vide";
      setError(apiError);
      toast.error("Erreur est survenue dans le formulaire 😕");
      return;
    }
    if (user.password !== user.passwordConfirm) {
      setBtnLoading(false);
      apiError.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe";
      setError(apiError);
      toast.error("Erreur est survenue dans le formulaire 😕");
      return;
    }
    //test d'Envoie le nouveau mot de passe
    try {
      await resetPassAPI.NewPassword(token, userC.password);
      toast.success("Votre mot de passe à été changé avec succès 😄");
      toast.success(
        "Vous pouvez désormais vous connecter avec votre nouveau mot de passe !😄"
      );
      setBtnLoading(false);
      history.replace("/login");
    } catch (error) {
      toast.error(
        "Une erreur est survenue lors du changement de mot de passe 😟"
      );
      setBtnLoading(false);
    }
  };

  return (
    <>
      <h1>Reset du mot de passe</h1>
      {editing === true ?
      <form onSubmit={handleSubmit}>
        <Field
          label="Mot de passe"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          error={error.password}
        />

        <Field
          name="passwordConfirm"
          label="Mot de passe de confirmation"
          value={user.passwordConfirm}
          onChange={handleChange}
          type="password"
          error={error.passwordConfirm}
        />

        <div className="form-group">
          <Button loading={btnLoading}>Enregistrer</Button>
        </div>
      </form>
      :""
      }
    </>
  );
};

export default ResetPassPage;
