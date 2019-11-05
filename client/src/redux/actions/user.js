import api from "../../util/apiConnection";
import { setAlert } from "./alert";
import setAuthToken from "../../util/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_CART,
  UPDATE_CART,
} from "./types";
import Cookies from "js-cookie";

//Load User
export const loadUser = () => async dispatch => {
  const token = Cookies.get("token");
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await api.get("/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(getCart());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await api.post("/auth/signup", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.msg, "red"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await api.post("/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.msg, "red"));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
//Logout
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
//Get Cart
export const getCart = () => async dispatch => {
  try {
    let cart = await api.get("/cart");
    dispatch({
      type: GET_CART,
      payload: cart.data,
    });
  } catch (err) {
    console.error(err);
  }
};
//Add to Cart
export const addToCart = product => async dispatch => {
  try {
    let res = await api.put("/cart/add", { _id: product });
    dispatch({
      type: UPDATE_CART,
    });
    dispatch(setAlert(res.data.msg, "green"));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "red"));
  }
  dispatch(getCart());
};
