import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

  return (
    <>
      <h1>Mon Profil</h1>
      TODO: FINIR LA PARTIE PROFIL
    </>
  );
};

export default UserPage;
