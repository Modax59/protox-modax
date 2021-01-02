import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import Button from "../components/forms/Button";
import { toast } from "react-toastify";
import axios from "axios";
import resetPassAPI from "../services/resetPassAPI";

const ForgotPassPage = ({history}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnLoading(true);
    try {
      //Envoie requete pour mail
     const test = await resetPassAPI.SendEmail(user.email);
     console.log(test.data['hydra:member'][0]);
      toast.success("Vous pouvez désormais changer votre mot de passe ! 😄");
      history.replace(test.data['hydra:member'][0]);
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      setError(
        "Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas !"
      );
      toast.error("Une erreur est survenue lors de la récuperation 😟");
      setBtnLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl">Mot de passe oublié ? </h1>

      <form onSubmit={handleSubmit}>
        <Field
          label="Votre Adresse email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Votre adresse mail de connexion"
          error={error}
        />

        <div className="form-group">
          <Button loading={btnLoading}>Valider</Button>
          <Link to="/login" className="btn btn-link">
            Retour à la page de connexion
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPassPage;
