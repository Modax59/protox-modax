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
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-2">
                <div className="container my-2">
                    <NavLink
                        className="navbar-brand text-primary font-effort text-3xl"
                        to="/"
                    >
                        Protox
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item font-semibold">
                                <NavLink className="nav-link nav-active hover-bg-blue-base font-medium text-lg"  to="/customers">
                                    Clients
                                </NavLink>
                            </li>
                            <li className="nav-item pl-5 font-semibold">
                                <NavLink className="nav-link nav-active hover-bg-blue-base font-medium text-lg" to="/invoices">
                                    Factures
                                </NavLink>
                            </li>
                        </ul>
                        <div className="my-2 my-lg-0">
                            {(!isAuthenticated && (
                                <>
                                    <li className="nav-item list-style-none">
                                        <NavLink to="/login" className="btn btn-primary blueBackGround">
                                            S'identifier
                                        </NavLink>
                                    </li>
                                </>
                            )) || (
                                <>
                                    <li className="dropdown list-style-none ">
                                        <a className="dropdown-toggle text-lg hover-bg-blue-base-no-border" href="#" id="navbarDropdown" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {firstName} {lastName}
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow-material-1"
                                             aria-labelledby="navbarDropdown">
                                            <NavLink to={"/user"} className="dropdown-item hover-shadow-material-1"><i
                                                className="ti-user"/> Compte</NavLink>
                                            <a className="dropdown-item hover-shadow-material-1" href="#"><i
                                                className="ti-settings"/> Paramètres</a>
                                            <button onClick={handleLogout}
                                                    className="dropdown-item hover-shadow-material-1"><i
                                                className="ti-power-off"/> Déconnexion
                                            </button>
                                        </div>
                                    </li>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

//
// <nav className="navbar navbar-expand-lg navbarColor shadow-3 m-0 p-0">
//     <div className="container">
<NavLink
    className="navbar-brand h1 text-primary font-effort"
    to="/"
>
    Protox
</NavLink>
//         <button
//             className="navbar-toggler "
//             type="button"
//             data-toggle="collapse "
//             data-target="#navbarColor03"
//             aria-controls="navbarColor03"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//         >
//         <span className="navbar-toggler-icon">
//           <i className="ti-menu"/>
//         </span>
//         </button>
//
//         <div className="collapse navbar-collapse" id="navbarColor03">
//             <ul className="navbar-nav mx-auto">
//                 <li className="nav-item">
//                     <NavLink className="nav-link topbar-btn h4" to="/customers">
//                         Clients
//                     </NavLink>
//                 </li>
//                 <li className="nav-item ">
//                     <NavLink className="nav-link topbar-btn h4" to="/invoices">
//                         Factures
//                     </NavLink>
//                 </li>
//             </ul>
//             <ul className="nav ml-lg-0">
//                 {(!isAuthenticated && (
//                     <>
//                         <li className="nav-item">
//                             <NavLink to="/login" className="btn  text-uppercase btn-primary">
//                                 S'identifier
//                             </NavLink>
//                         </li>
//                     </>
//                 )) || (
//                     <>
//                         <li className="nav-item">
//                             <li className="dropdown">
//                                 <li className="topbar-btn" data-toggle="dropdown"> {firstName} {lastName}
//                                     {!loading && <i className="pl-2 ti-angle-down fs-10"/>}</li>
//                                 <div className="dropdown-menu dropdown-menu-right shadow-5">
//                                     <NavLink to={"/user"} className="dropdown-item"><i
//                                         className="ti-user"/> Compte</NavLink>
//                                     <a className="dropdown-item" href="#"><i
//                                         className="ti-settings"/> Paramètres</a>
//                                     <button onClick={handleLogout} className="dropdown-item"><i
//                                         className="ti-power-off"/> Déconnexion
//                                     </button>
//                                 </div>
//                             </li>
//                         </li>
//                         <div className="ml-5 mt-2">
//                             {loading && <DropdownLoader/>}
//                         </div>
//                     </>
//                 )}
//             </ul>
//         </div>
//     </div>
// </nav>
