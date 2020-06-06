import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";
import { toast } from "react-toastify";
import FormLoader from "../components/loaders/FormContentLoader";
import FormContentLoader from "../components/loaders/FormContentLoader";
import Button from "../components/forms/Button";
import AuthAPI from "../services/authAPI";

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
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  //Recuperation du customer en fonciton de l'identifiant
  const fetchCustomer = async (id) => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      );

      setCustomer({ firstName, lastName, email, company });
      setLoading(false);
    } catch (error) {
      toast.error("Le client n'a pas pu etre chargé 😟");
      history.replace("/customers");
    }
  };

  //Chargement du customer au chargment du composant ou au changement de l'identifiant
  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
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
    const auth = AuthAPI.isAuthenticated();
    event.preventDefault();
    if (auth == true) {
      try {
        setBtnLoading(true);
        setError({});
        if (editing) {
          await CustomersAPI.update(id, customer);
          toast.success("Le client à bien été modifié 😀");
        } else {
          await CustomersAPI.create(customer);
          toast.success("Le client à bien été créé 😀");
          setBtnLoading(false);
          history.replace("/customers");
        }
      } catch ({ response }) {
        const { violations } = response.data;

        if (violations) {
          const apiError = {};
          violations.map(({ propertyPath, message }) => {
            apiError[propertyPath] = message;
          });
          setError(apiError);
          setBtnLoading(false);
          toast.error("Une erreur est survenue dans le formulaire");
        }
      }
    } else {
      AuthAPI.logout();
    }
  };
  return (
    <>
      {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification du client</h1>
      )}
      {loading && <FormContentLoader />}

      {!loading && (
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
            <Button loading={btnLoading}>
              <label htmlFor="">
                <i className=" ti-check "></i>
              </label>
              Enregistrer
            </Button>
            <Link to="/customers" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      )}
    </>
  );
};

export default CustomerPage;
