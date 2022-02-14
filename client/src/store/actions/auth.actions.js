import { authActions } from "../reducers/auth.reducer";
import { removeToken, validAuthToken } from "../../util/common";
import {
  loginApi,
  registerApi
} from "../../services/apiService";

const _sendAuthRequest = (sendRequest, data) => {
  return async (dispatch) => {
    dispatch(authActions.setLoading(true));

    try {
      const postData = await sendRequest(data);

      if (postData) {
        // Set data
        localStorage.setItem("authToken", postData.data.token);
        // Get expiration
        const expiration =
          new Date().getTime() + 1000 * 60 * 60 * 24 * +postData.data.expiresIn;
        localStorage.setItem("expiration", expiration);
        dispatch(autoLogin());
      }

      dispatch(authActions.setLoading(false));

    } catch (err) {
      dispatch(authActions.setLoading(false));
    }
  };
};

export const handleRegister = (data) => {
  return async (dispatch) => dispatch(_sendAuthRequest(registerApi, data));
};

export const handleLogin = (data) => {
  return async (dispatch) => dispatch(_sendAuthRequest(loginApi, data));
};

export const autoLogin = () => {
  return (dispatch) => {
    const tokenValid = validAuthToken();

    if (tokenValid !== false) {
      dispatch(authActions.login());
    }
  };
};

export const createLogout = () => {
  return async (dispatch) => {
    // Remove Tokens
    removeToken();
  };
};
