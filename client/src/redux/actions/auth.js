import Cookies from "js-cookie";

import api from "../../util/apiConnection";
import { setAlert } from "./alert";
import { getCart } from "./cart";
import setAuthToken from "../../util/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER
} from "./types";

//Load User
export const loadUser = () => async dispatch => {
  const token = Cookies.get("token");
  if (token) {
    setAuthToken(token);
    try {
      const res = await api.get("/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      dispatch(getCart());
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } else {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async dispatch => {
  dispatch(clearUser());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post("/auth/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response;
    if (error) {
      dispatch(setAlert(error.data.msg, "red"));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login User
export const login = ({ email, password }) => async dispatch => {
  dispatch(clearUser());

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post("/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response;
    if (error) {
      dispatch(setAlert(error.data.msg, "red"));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
  dispatch(setAlert("Signed out", "yellow"));
};
//Clear user state
export const clearUser = () => dispatch => {
  dispatch({ type: CLEAR_USER });
  Cookies.remove("token");
  setAuthToken(null);
};
