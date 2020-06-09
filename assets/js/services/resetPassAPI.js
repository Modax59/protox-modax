import axios from "axios";
import { API_URL } from "../config";

async function EmailToId(email) {
  return axios
    .get(API_URL+ "get/emailToId/" + email)
    .then((response) => response.data);
}

async function SendEmailWithID(id) {
  return axios.post(
    "http://localhost:8000/api/users/" + id + "/ForgotPass",
    {}
  );
}

async function TokenToId(token) {
  return axios.post(
    "http://localhost:8000/api/reset/" + token + "/ResetPass",
    {}
  );
}

async function NewPassword(id, user, password) {
  return axios.post("http://localhost:8000/api/users/newpass/" + id, {
    ...user,
    password: password,
  });
}

export default {
  EmailToId,
  SendEmailWithID,
  TokenToId,
  NewPassword,
};
