import axios from "axios";
import Cache from "./cache";
import { CUSTOMERS_API } from "../config";

async function findAll() {
  const cachedCustomers = await Cache.get("customers");
  if (cachedCustomers) return cachedCustomers;

  return axios.get(CUSTOMERS_API).then((response) => {
    const customers = response.data["hydra:member"];

    return customers;
  });
}

async function deleteCustomer(id) {
  return axios.delete(CUSTOMERS_API + "/" + id);
}

function find(id) {
  return axios.get(CUSTOMERS_API + "/" + id).then((response) => {
    const data = response.data;
    return data;
  });
}

function update(id, customer) {
  return axios.put(CUSTOMERS_API + "/" + id, customer);
}

function create(customer) {
  return axios.post(CUSTOMERS_API, customer);
}
export default {
  findAll,
  delete: deleteCustomer,
  find,
  update,
  create,
};
