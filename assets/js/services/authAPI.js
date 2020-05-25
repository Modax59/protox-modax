import axios from "axios";
import jwtDecode from "jwt-decode";
import Cache from "./cache";
import { LOGIN_API } from "../config";

//Déconnexion, suppression token en local et axios
function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
  Cache.invalidate("customers");
}

//Requete http d'authentification et stockage du token et dans axios
function authenticate(credentials) {
  return axios
    .post(LOGIN_API, credentials)
    .then((response) => response.data.token)
    .then((token) => {
      //Stockage du token dans le local storage
      window.localStorage.setItem("authToken", token);
      //On previent axios qu'on a un header sur tous les futurs requetes
      setAxiosToken(token);
    });
}

//Pösitionne le token sur axios
function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

//Mise en place lors du chargment de l'application
function setup() {
  //Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    } else {
      logout();
    }
  } else {
    logout();
  }
}

//Permet de savoir si on est authentifié
function isAuthenticated() {
  //Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //Si le token est encore valide
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
};
