import axios from "axios";
import {USERS_API} from "../config";

function register(user) {
  return axios.post(USERS_API, user);
}

async function updateUser(user) {
  return axios.get(USERS_API + "/update", user);
}


export default {
  register,
  updateUser,
};
