import axios from "axios";

async function EmailToId(email) {
  return axios
    .post("http://localhost:8000/api/users/emailToId/" + email, {})
    .then((response) => response.data.id);
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
