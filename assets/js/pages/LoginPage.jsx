import React, {useContext, useState} from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";
import Button from "../components/forms/Button";
import {Link} from "react-router-dom";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [btnLoading, setBtnLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    //Gestion des champs
    const handleChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setCredentials({...credentials, [name]: value});
    };

    //Gestion du submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        setBtnLoading(true);
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté ! 😄");
            setBtnLoading(false);
            history.replace("/customers");
        } catch (error) {
            setError(
                "Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas !"
            );
            toast.error("Une erreur est survenue lors de la connexion 😟");
            setBtnLoading(false);
        }
    };
    return (
        <>
            <div className="row center-vh p-20 m-0">
                <div className="card card-shadowed px-50 py-30 w-400px">
                    <h5 className="text-uppercase py-4">Connexion</h5>

                    <form className="form-type-material" onSubmit={handleSubmit}>
                        <Field
                            label=""
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Adresse email de connexion"
                            error={error}
                        />
                        <div className="py-1"/>
                        <Field
                            name="password"
                            label=""
                            value={credentials.password}
                            placeholder="Mot de passe"
                            onChange={handleChange}
                            type="password"
                            error=""
                        />
                        <div className="form-group">
                            <Button
                                loading={btnLoading}
                                className="btn-bold btn-block"
                                btnlabel=" "
                            >
                                Je me connecte
                            </Button>
                            <div className="pt-2">
                                <Link to="/forgotPassword">Mot de passe oublié ?</Link>
                                <div className="divider ">Pas de compte ?</div>
                                <Link to="/register">
                                    <Button
                                        loading={btnLoading}
                                        className="btn-bold btn-block btn-secondary"
                                        btnlabel=" "
                                    >
                                        Inscription
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
