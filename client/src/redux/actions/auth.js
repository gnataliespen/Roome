import api from "../../util/apiConnection";
import { setAlert } from "./alert";
import setAuthToken from "../../util/setAuthToken";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";
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
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async dispatch => {
  setAlert("register", "danger");
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
  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.msg, "danger"));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
