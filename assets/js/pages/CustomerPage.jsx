import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";

const CustomerPage = ({ match, history }) => {
  const { id = "new" } = match.params;

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  const [error, setError] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  const [editing, setEditing] = useState(false);

  //Recuperation du customer en fonciton de l'identifiant
  const fetchCustomer = async (id) => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      );

      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      //TODO : Notification flash d'une érreur
      history.replace("/customers");
    }
  };

  //Chargement du customer au chargment du composant ou au changement de l'identifiant
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchCustomer(id);
    }
  }, [id]);

  //Gestion des chanements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  //Gestion de la soumition du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        await CustomersAPI.update(id, customer);
        //TODO : Flash notification de succès
      } else {
        await CustomersAPI.create(customer);
        //TODO : Flash notification de succès
        history.replace("/customers");
      }
      setError({});
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiError = {};

        violations.map(({ propertyPath, message }) => {
          apiError[propertyPath] = message;
        });
        setError(apiError);

        //TODO : Flash notification des erreurs
      }
    }
  };
  return (
    <>
      {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification du client</h1>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom"
          placeholder="Nom du client"
          value={customer.lastName}
          onChange={handleChange}
          error={error.lastName}
        />
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Prénom du client"
          value={customer.firstName}
          onChange={handleChange}
          error={error.firstName}
        />
        <Field
          name="email"
          label="Email"
          placeholder="Adresse email du client"
          type="email"
          value={customer.email}
          onChange={handleChange}
          error={error.email}
        />
        <Field
          name="company"
          label="Entreprise"
          placeholder="Entreprise du client"
          value={customer.company}
          onChange={handleChange}
          error={error.company}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/customers" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
