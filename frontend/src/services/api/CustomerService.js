import request from "../request";

const urlGetCustomers = "customers";

const getCustomers = (page) => {
  return request
    .get(`${urlGetCustomers}?page=${page}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const saveCustomer = (data) => {
  return request
    .post(urlGetCustomers, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const methods = { getCustomers, saveCustomer };

export default methods;
