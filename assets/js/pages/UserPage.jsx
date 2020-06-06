import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import profil from "../../img/profil.svg";
import Field from "../components/forms/Field";

const UserPage = ({ match }) => {
  const { id = "" } = match.params;
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
  }, [id]);

  const fetchUser = async (id) => {
    try {
      const { firstName, lastName, email } = await axios
        .get("http://localhost:8000/api/users/" + id)
        .then((Response) => Response.data);
      setUser({ firstName, lastName, email });

      setLoading(false);
    } catch (error) {
      toast.error("Le client n'a pas pu etre chargé 😟");
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 text-center">
          <img
            className="border rounded-circle border-dark"
            src={profil}
            alt=""
            height="20%"
          />
          <div className="row pt-3">
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
    </>
  );
};

export default UserPage;
