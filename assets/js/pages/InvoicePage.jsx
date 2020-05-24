import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";

const InvoicePage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "SENT",
  });

  const [customers, setCustomers] = useState([]);

  const [editing, setEditing] = useState(false);

  const [erros, setErros] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  //Recuperation des clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      if (editing) {
        if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
      }
    } catch (error) {
      history.replace("/invoices");
    }
  };

  //Recuperation d'une facture
  const fetchInvoice = async (id) => {
    try {
      const { amount, status, customer } = await InvoicesAPI.find(id);
      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      history.replace("/invoices");
    }
  };

  //Recuperation de la liste des clients à chaque chargment de la page
  useEffect(() => {
    fetchCustomers();
  }, []);

  //Recuperation de la bonne facture quand l'identifiant de l'url change
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  //Gestion de la soumittion du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        await InvoicesAPI.update(id, invoice);
        //TODO Flash notification
      } else {
        await InvoicesAPI.create(invoice);
        //TODO : Flash Notification succès
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiError = {};

        violations.map(({ propertyPath, message }) => {
          apiError[propertyPath] = message;
        });
        setErros(apiError);

        //TODO : Flash notification des erreurs
      }
    }
  };

  return (
    <>
      {(editing && <h1>Modification de la facture</h1>) || (
        <h1>Création d'une facture </h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="amount"
          label="Montant"
          type="number"
          placeholder="Montant de la facture"
          onChange={handleChange}
          value={invoice.amount}
          error={erros.amount}
        />
        <Select
          name="customer"
          label="Client"
          value={invoice.customer}
          error={erros.customer}
          onChange={handleChange}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          label="Statut"
          value={invoice.status}
          error={erros.status}
          onChange={handleChange}
        >
          <option value="SENT">Envoyée</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/invoices" className="btn btn-link">
            Retour aux factures
          </Link>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
