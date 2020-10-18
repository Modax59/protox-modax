import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Profil from "../../img/profil.svg";
import Field from "../components/forms/Field";
import {USERS_API} from "../config";
import AuthAPI from "../services/authAPI";
import resetPassAPI from "../services/resetPassAPI";

const UserPage = ({match}) => {

    const [id,setId] = useState();
    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
    });
    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        fetchUser(id);
    }, []);

    const fetchUser = async (id) => {
        try {
            const emailU = AuthAPI.getEmail();
            const data = await resetPassAPI.getUserByEmail(emailU);
            id=(data.data.id);
            const {firstName, lastName, email} = await axios
                .get(USERS_API + "/" + id)
                .then((Response) => Response.data);
            setUser({firstName, lastName, email});
            setLoading(false);
        } catch (error) {
            toast.error("Le client n'a pas pu etre chargé 😟");
        }
    };

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    };

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-shadowed ">
                        <div className="card-body">
                            <ul>
                                <h3>
                                    <i className="ti-angle-right"/> Mes informations
                                </h3>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 text-center">
                    <div className="card card-shadowed">
                        <div className="pt-5 pl-5 pr-5">
                            <div className="text-center">
                                <img
                                    className=""
                                    src={Profil}
                                    height="20%"
                                    width="20%"
                                    alt=""
                                />
                                <hr/>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <Field
                                        label="Nom"
                                        labelClass="pt-3"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        placeholder="Nom de famille"
                                        disabled="disabled"
                                        moreClass="text-center "
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        label="Prénom"
                                        labelClass="pt-3"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        placeholder="Prénom"
                                        disabled="disabled"
                                        moreClass="text-center"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <Field
                                        label="Adresse email"
                                        labelClass="pt-5"
                                        name="username"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Adresse email de connexion"
                                        disabled="disabled"
                                        moreClass="text-center"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;
