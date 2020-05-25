import axios from "axios";
import Cache from "./cache";
import { CUSTOMERS_API } from "../config";

async function findAll() {
  const cachedCustomers = await Cache.get("customers");
  if (cachedCustomers) return cachedCustomers;

  return axios.get(CUSTOMERS_API).then((response) => {
    const customers = response.data["hydra:member"];
    Cache.set("customers", customers);
    return customers;
  });
}

async function deleteCustomer(id) {
  return axios.delete(CUSTOMERS_API + "/" + id).then((response) => {
    Cache.invalidate("customers");
  });
}

function find(id) {
  return axios.get(CUSTOMERS_API + "/" + id).then((response) => {
    const data = response.data;
    Cache.invalidate("customers");
    return data;
  });
}

function update(id, customer) {
  return axios.put(CUSTOMERS_API + "/" + id, customer).then((response) => {
    Cache.invalidate("customers");
  });
}

function create(customer) {
  return axios.post(CUSTOMERS_API, customer).then((response) => {
    Cache.invalidate("customers");
  });
}
export default {
  findAll,
  delete: deleteCustomer,
  find,
  update,
  create,
};
