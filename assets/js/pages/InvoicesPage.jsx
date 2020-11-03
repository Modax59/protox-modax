import moment from "moment";
import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/InvoicesAPI";
import {Link, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";
import SearchBar from "../components/forms/SearchBar";
import AlertWarningDelete from "../components/Alerts/AlertWarningDelete";
import AlertSuccess from "../components/Alerts/AlertSuccess";

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
    const itemsPerPage = 10;

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

    const handleSearch = (event) => {
        setSearch(event.currentTarget.value);
        setCurrentPage(1);
    };

    const handleSearch1 = (event) => {
        setSearch(event.currentTarget.id);
        setCurrentPage(1);
    };

    //Gestion Suppression d'un invoice
    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter((invoice) => invoice.id !== id));
        try {
            await InvoicesAPI.delete(id);
            AlertSuccess({text:"Facture Supprimé avec succès !"})
            toast.success("La facture a bien été supprimée 😄");
        } catch (error) {
            toast.error("Une erreur est survenue 😕");
            setInvoices(originalInvoices);
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
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1 className="fadeInLeftBig animated text-3xl">Liste des factures</h1>
                <Link
                    to="/invoices/new"
                    className="fadeInRightBig animated btn btn-label btn-primary blueBackGround rounded-pill shadow-material-2"
                >
                    <label htmlFor="">
                        <i className="ti-plus"/>
                    </label>
                    Créer une facture
                </Link>
            </div>
            <div className="form-inline">
                <span className="text-lg "><span onClick={handleSearch1}
                                                 className={search === "" ? "hover-bg-blue-base-spacing cursor-pointer active-invoices" : "hover-bg-blue-base-spacing cursor-pointer"}
                                                 id="">Toutes les factures</span></span>
                <span className="pl-3 text-lg"><span onClick={handleSearch1}
                                                     className={search === "Payée" ? "hover-bg-blue-base-spacing cursor-pointer active-invoices" : "hover-bg-blue-base-spacing cursor-pointer"}
                                                     id="Payée">Payée</span></span>
                <span className="pl-3 text-lg"><span onClick={handleSearch1}
                                                     className={search === "Annulée" ? "hover-bg-blue-base-spacing cursor-pointer active-invoices" : "hover-bg-blue-base-spacing cursor-pointer"}
                                                     id="Annulée">Non payée</span></span>
                <SearchBar value={search} onChange={handleSearch}/>
            </div>
            <span className="hr"/>
            {!loading && (
                <table className="table table-hover table-separated">
                    <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date d'envoie</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedInvoices.map((invoice) => (
                        <tr className="shadow-material-1 hover-shadow-material-2 table-perso" key={invoice.id}>
                            <td>{invoice.chrono}</td>
                            <td>
                                <NavLink className="blueColor" to={"/customers/" + invoice.customer.id}>
                                    {invoice.customer.firstName} {invoice.customer.lastName}
                                </NavLink>
                            </td>
                            <td className="text-center">{formatDate(invoice.sentAt)}</td>
                            <td className="text-center">
                  <span
                      className={
                          " px-3 py-2 badge badge-" + STATUS_CLASSES[invoice.status]
                      }
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
                                    className="btn btn-sm btn-label btn-warning mr-1"
                                >
                                    <label htmlFor="">
                                        <span className="ti-settings"></span>
                                    </label>
                                    Modifier
                                </Link>
                                <button
                                    onClick={() => AlertWarningDelete({text: "Une fois supprimé, vous ne pourrez plus récupérer cette facture !"}).then((willDelete) => {
                                        if (willDelete) {
                                            handleDelete(invoice.id)
                                        }
                                    })}
                                    className="btn btn-sm btn-label btn-danger"
                                >
                                    <label htmlFor="">
                                        <i className="ti-close"></i>
                                    </label>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {loading && <TableLoader/>}
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
