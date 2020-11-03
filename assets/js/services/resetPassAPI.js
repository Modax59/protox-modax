import axios from "axios";
import {API_URL, USERS_API} from "../config";

async function SendEmail(email) {
  return axios.post(
    API_URL+"ForgotPass/"+ email ,
    {}
  );
}

async function tokenIsValid(token) {
  return axios.post(
      API_URL+"reset/" + token + "/ResetPass",
    {}
  );
}

async function NewPassword(token, password) {
  return axios.post(USERS_API+"/newpass/" + token, {
    password
  });
}

async function getUserByEmail(email) {
  return axios.get(API_URL+"getUser/"+email,{});
}

export default {
  SendEmail,
  tokenIsValid,
  NewPassword,
  getUserByEmail,
};
