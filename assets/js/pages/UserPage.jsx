import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Field from "../components/forms/Field";
import {USERS_API} from "../config";
import AuthAPI from "../services/authAPI";
import resetPassAPI from "../services/resetPassAPI";
import usersAPI from "../services/usersAPI";
import AlertSuccess from "../components/Alerts/AlertSuccess";
import Navbar from "../components/Navbar";
import Button from "../components/forms/Button";

const UserPage = ({match}) => {

    const [id, setId] = useState();
    const [user, setUser] = useState({
        lastName: "",
        firstName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
    });
    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        currentPassword: "",
        newPassword: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        fetchUser(id);
    }, []);

    const editorPass = function () {
        if (isEditing === false) {
            setIsEditing(true);
        }
        if (isEditing === true) {
            setIsEditing(false);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = await usersAPI.updateUser({...user, isEditing: isEditing});
            setLoading(false)
            if (data.data["hydra:member"]) {
                const BadToken = data.data["hydra:member"];
                if (BadToken[0] === "Invalide Password") {
                    toast.error(
                        "Votre mot de passe actuel est incorrect 😕"
                    );
                }
            }else {
                AlertSuccess({text: "Vos informations ont été enregistrés avec succès !"})
            }
        } catch (error) {
            toast.error("Les informations n'ont pas pu etre enregistré !")
        }
    };

    const fetchUser = async (id) => {
        try {
            const emailU = AuthAPI.getEmail();
            const data = await resetPassAPI.getUserByEmail(emailU);
            id = (data.data.id);
            const {firstName, lastName, email} = await axios
                .get(USERS_API + "/" + id)
                .then((Response) => Response.data);
            setUser({firstName, lastName, email, currentPassword: "", newPassword: ""});
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
                <div className="col-md-2 offset-2">
                    <ul>
                        <h2 className="mt-4 h6 bg-white px-3 py-1 rounded-pill text-dark font-weight-bold shadow-2">
                             Mon compte
                        </h2>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div className="card p-4 shadow-5 rounded-extra-lg">
                        <span className="font-semibold h3">Mon compte</span>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <Field
                                        label="Nom"
                                        labelClass="pt-3 font-semibold"
                                        name="lastName"
                                        value={user.lastName}
                                        onChange={handleChange}
                                        placeholder="Nom de famille"
                                        moreClass="rounded-lg bg-gray-100"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Field
                                        label="Prénom"
                                        labelClass="pt-3 font-semibold"
                                        name="firstName"
                                        value={user.firstName}
                                        onChange={handleChange}
                                        placeholder="Prénom"
                                        moreClass="rounded-lg bg-gray-100"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <hr className="hr-sm bg-gray-200"/>
                                    <Field
                                        label="Adresse email"
                                        labelClass=" font-semibold"
                                        name="username"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Adresse email de connexion"
                                        moreClass="rounded-lg readonly bg-gray-100"
                                    />
                                </div>
                                <div className="col-md-12">
                                    <hr className="hr-sm bg-gray-200"/>
                                </div>
                                <div className="col-md-6 ">
                                    <Field
                                        label="Mot de passe"
                                        labelClass=" font-semibold"
                                        name="password"
                                        value="password"
                                        type="password"
                                        onChange={handleChange}
                                        placeholder="Mot de passe"
                                        moreClass="rounded-lg readonly bg-gray-100"
                                    />
                                </div>
                                <div className="col-md-6 d-flex">
                                    <button type="button" onClick={() => editorPass()}
                                            className="bg-white blueColor font-semibold py-2 px-4 border border-gray-400 rounded shadow my-auto ml-auto">
                                        {!isEditing ? <>Modifier</> : <>Ne plus modifier</>}
                                    </button>
                                </div>
                                {isEditing && <>
                                    <div className="col-md-12">
                                        <hr className="hr-sm bg-gray-200"/>
                                    </div>
                                    <div className="col-md-6">
                                        <Field
                                            label="Mot de passe actuel"
                                            labelClass=" font-semibold"
                                            name="currentPassword"
                                            type="password"
                                            value={user.currentPassword}
                                            onChange={handleChange}
                                            placeholder="Mot de passe"
                                            moreClass="rounded-lg bg-gray-100"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <Field
                                            label="Nouveau mot de passe"
                                            labelClass=" font-semibold"
                                            name="newPassword"
                                            type="password"
                                            value={user.newPassword}
                                            onChange={handleChange}
                                            placeholder="Nouveau mot de passe"
                                            moreClass="rounded-lg bg-gray-100"
                                        />
                                    </div>
                                </>}
                                <div className="col-md-12">
                                    <hr className="hr-sm bg-gray-200"/>
                                </div>
                                <div className="col-md-6 ">
                                    <span className="h6 font-semibold">Supprimer mon compte (Bientot disponible)</span>
                                    <br/>
                                    <span className="fs-11 font-medium">En supprimant votre compte, vous perdrez toutes vos données</span>
                                </div>
                                <div className="col-md-6 d-flex">
                                    <button type="button"
                                            className="bg-white text-red-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow my-auto ml-auto">
                                        Supprimer mon compte
                                    </button>
                                </div>
                                <div className="col-md-12">
                                    <hr className="hr-sm bg-gray-200"/>
                                </div>
                                <div className="col-md-12 d-flex my-3">
                                    <Button type="button" onClick={() => handleSubmit()} loading={loading}
                                            className="blueBackGround hover:bg-gray-100 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-auto">
                                        Sauvegarder les changements
                                    </Button>
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
