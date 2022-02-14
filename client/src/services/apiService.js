import axios from "axios";
import { getAuthorizationToken } from "../util/token";
import handleErrorResponse from "../util/error-response";

const conn = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

conn.interceptors.request.use(
  (config) => {
    if (getAuthorizationToken() !== null) {
      config.headers.Authorization = getAuthorizationToken();
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

conn.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    let errMsg = null;
    if (err.response?.status === 401) {
      window.location.href = "/logout";
    } else {
      errMsg = handleErrorResponse(err);
      if (errMsg) {
        // dispatch(
        //   uiActions.showAlert({
        //     title: "Error",
        //     message: errMsg,
        //   })
        // );
      }
    }
    return Promise.reject(errMsg);
  }
);

export const RegisterApi = (data) => conn.post('/register', data);

export const LoginApi = (data) =>  conn.post('/login', data);
