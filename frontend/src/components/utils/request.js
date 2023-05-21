import axios from "axios";
import { AUTH_TOKEN, getCookie } from "./cookie";

export const baseurl = 'http://localhost:3000';

const header = () => ({
  Authorization: getCookie(AUTH_TOKEN),
});

const Payheader = () => ({
  Authorization: "Token q18jo4ecg49n555i0nvapakh1idqeugq",
  Accept:"application/vnd.proxypay.v2+json"
});



export const doGet = async (path) => {
  const response = await axios.get(`${baseurl}/${path}`, {
    headers: header(),
  });

  return response.data;
};

export const doPost = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/${path}`, data, {
        headers: header(),
      });
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error.response);
    }
  });
};

export const doPut = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.put(`${baseurl}/${path}`, data, {
      headers: header(),
    });

    if ([200, 201].includes(response.status)) {
      return resolve(response);
    }

    return reject(response);
  });
};
//Payment Method
export const PayPut = async (path, data) => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.put(`${baseurl}/${path}`, data, {
      headers: Payheader(),
    });

    if ([200, 201].includes(response.status)) {
      return resolve(response);
    }

    return reject(response);
  });
};

export const doDelete = async (path, data) => {
  return new Promise(async (resolve, reject) => { 
    try {
      const response = await axios.delete(`${baseurl}/${path}`, {
        headers: header(),
        data,
      });
  
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
  
      return reject(response);
    } catch(error) {
      return reject()
    }
    
  });
};
