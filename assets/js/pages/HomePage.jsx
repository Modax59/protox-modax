import React from "react";
import svg from "../../img/startup.svg";
import {NavLink} from "react-router-dom";

const HomePage = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="display-3 pt-5 font-weight-bold font-effort">
                        Protox
                    </div>
                    <div className="display-3 pt-2 font-weight-bold">Free CRM</div>
                    <div className="pt-5">
                        <p className="lead text-dark text-monospace">
                            <span className="font-effort">PROTOX</span> est un CRM (Customer
                            Relationship Management).
                            <span className="font-effort"> PROTOX</span> vous permettra de
                            gerer tous vos clients ainsi que vos factures appartenant à vos
                            clients. Facile d'utilisation, responsive, et intéractifs, il est
                            entièrement gratuit.
                        </p>
                        <p className="lead text-dark text-monospace"><span
                            className="font-effort"> PROTOX</span> réalisé par Modax</p>
                    </div>
                    <div className="pt-4">
                        <div className="row">
                            <div className="col-md-6">
                                <NavLink
                                    className="btn btn-outline-dark px-5 py-3"
                                    to="/register"
                                >
                                    INSCRIPTION
                                </NavLink>
                            </div>
                            <div className="col-md-6">
                                <NavLink className="btn btn-dark px-5 py-3" to="/login">
                                    CONNEXION
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="pl-5 ml-5">
                        <img src={svg} alt="" width="100%" height="100%"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
