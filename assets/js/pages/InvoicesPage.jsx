import moment from "moment";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/InvoicesAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "secondary",
  CANCELLED: "danger",
};

const STATUS_LABEL = {
  PAID: "Payée",
  SENT: "Envoyée",
  CANCELLED: "Annulée",
};

const InvoicesPage = (props) => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  //Recuperation des invoices au pres de l'api
  const fetchInvoices = async () => {
    try {
      const data = await InvoicesAPI.findAll();
      setInvoices(data);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors du chargement des factures");
    }
  };

  //Gestion du changement de page
  useEffect(() => {
    fetchInvoices();
  }, []);

  //Gestion du changement de page
  const handlePageChange = (page) => setCurrentPage(page);

  //Gestion de la recherche
  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
    setCurrentPage(1);
  };

  //Gestion Suppression d'un invoice
  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
    try {
      await InvoicesAPI.delete(id);
      toast.success("La facture a bien été supprimée 😄");
    } catch (error) {
      toast.error("Une erreur est survenue 😕");
      setInvoices(originalInvoices);
      console.log(error.response);
    }
  };

  //Gestion du format de date
  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

  //Gestion de la recherche
  const filteredInvoices = invoices.filter(
    (i) =>
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().includes(search.toLowerCase()) ||
      STATUS_LABEL[i.status].toLowerCase().includes(search.toLowerCase()) ||
      formatDate(i.sentAt).toLowerCase().includes(search.toLowerCase())
  );

  //Pagination des données
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Liste des factures</h1>
        <Link to="/invoices/new" className="btn btn-primary">
          Créer une facture
        </Link>
      </div>

      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Recherchez.."
        />
      </div>

      {!loading && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Client</th>
              <th className="text-center">Date d'envoie</th>
              <th className="text-center">Statut</th>
              <th className="text-center">Montant</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.chrono}</td>
                <td>
                  <Link to={"/customers/" + invoice.customer.id}>
                    {invoice.customer.firstName} {invoice.customer.lastName}
                  </Link>
                </td>
                <td className="text-center">{formatDate(invoice.sentAt)}</td>
                <td className="text-center">
                  <span
                    className={"badge badge-" + STATUS_CLASSES[invoice.status]}
                  >
                    {STATUS_LABEL[invoice.status]}
                  </span>
                </td>
                <td className="text-center">
                  {invoice.amount.toLocaleString()} €
                </td>
                <td>
                  <Link
                    to={"/invoices/" + invoice.id}
                    className="btn btn-sm btn-warning mr-1"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {loading && <TableLoader />}
      {itemsPerPage < filteredInvoices.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChanged={handlePageChange}
          length={filteredInvoices.length}
        />
      )}
    </>
  );
};

export default InvoicesPage;
