import React, {useContext, useState, useEffect} from "react";
import AuthAPI from "../services/authAPI";
import {NavLink} from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import {toast} from "react-toastify";
import resetPassAPI from "../services/resetPassAPI";
import DropdownLoader from "./loaders/DropdownLoader";

const Navbar = ({history}) => {
    const [id, setId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [loading, setLoading] = useState(true);

    const getId = async (email) => {
        try {
            const email = AuthAPI.getEmail();
            const data = await resetPassAPI.getUserByEmail(email);
            setFirstName(data.data.firstName.charAt(0).toUpperCase() + data.data.firstName.slice(1));
            setLastName(data.data.lastName.charAt(0).toUpperCase() + data.data.lastName.slice(1))
            setId(data.data.id);
            setLoading(false);
        } catch (error) {
            toast.error("Votre profil n'a pas pu etre chargé 😟");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getId(id);
        }
    }, []);

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous etes désormais déconnecté 😃");
        history.push("/login");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar shadow-4 m-0 p-0">
                <div className="container">
                    <NavLink
                        className="navbar-brand h1 text-primary font-effort"
                        to="/"
                    >
                        Protox
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
          <i className="ti-menu"/>
        </span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link topbar-btn h4" to="/customers">
                                    Clients
                                </NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link topbar-btn h4" to="/invoices">
                                    Factures
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            {(!isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="btn  text-uppercase btn-primary">
                                            S'identifier
                                        </NavLink>
                                    </li>
                                </>
                            )) || (
                                <>
                                    <li className="dropdown">
                                        <span className="topbar-btn" data-toggle="dropdown"> {firstName} {lastName}
                                            {!loading && <i className="pl-2 ti-angle-down fs-10"/>}</span>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <NavLink to={"/user"} className="dropdown-item" ><i className="ti-user"/> Compte</NavLink>
                                            <a className="dropdown-item" href="#"><i
                                                className="ti-settings"/> Paramètres</a>
                                            <button onClick={handleLogout} className="dropdown-item" ><i
                                                className="ti-power-off"/> Déconnexion</button>
                                        </div>
                                    </li>
                                    <div className="ml-5 mt-2">
                                        {loading && <DropdownLoader/>}
                                    </div>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;


// <header className="topbar topbar-expand-lg ">
//     <div className="container">
//         <div className="topbar-left">
//             <span className="topbar-btn sidebar-toggler"><i>&#9776;</i></span>
//             <span className="topbar-brand">
//                     <NavLink
//                         className="text-primary font-effort h1"
//                         to="/"
//                     >
//                             Protox
//                         </NavLink>
//                 </span>
//
//             <div className="topbar-divider d-none d-xl-block"/>
//
//             <nav className="topbar-navigation">
//                 <ul className="menu">
//
//                     <li className="menu-item">
//                         <NavLink to="/customers" className="menu-link">
//                             <span className="title fs-18">Clients</span>
//                         </NavLink>
//                     </li>
//
//                     <li className="menu-item">
//                         <NavLink className="menu-link" to="/invoices">
//                             <span className="title fs-18">Factures</span>
//                         </NavLink>
//                     </li>
//
//                 </ul>
//             </nav>
//         </div>
//         <div className="topbar-right">
//             <ul className="topbar-btns">
//                 <li className="dropdown">
//                         <span className="topbar-btn" data-toggle="dropdown"><img className="avatar"
//                                                                                  src=""
//                                                                                  alt="..."/></span>
//                     <div className="dropdown-menu dropdown-menu-right">
//                         <a className="dropdown-item" href="#"><i className="ti-user"/> Profile</a>
//                         <a className="dropdown-item" href="#"><i className="ti-settings"/> Settings</a>
//                         <a className="dropdown-item" href="#"><i className="ti-help"/> Help</a>
//                         <div className="dropdown-divider"/>
//                         <a className="dropdown-item" href="#"><i className="ti-power-off"/> Logout</a>
//                     </div>
//                 </li>
//             </ul>
//
//         </div>
//     </div>
// </header>