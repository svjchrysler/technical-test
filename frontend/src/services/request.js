import axios from "axios";
import enviroment from "../enviroment";

const instance = axios.create();

const post = (url, data = {}) => {
  return instance
    .post(`${enviroment.url}/${url}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const put = (url, data = {}) => {
  return instance
    .put(`${enviroment.url}/${url}`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const get = (url) => {
  return instance
    .get(`${enviroment.url}/${url}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
};

const methods = { post, get, put };

export default methods;
