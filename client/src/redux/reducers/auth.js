import Cookies from "js-cookie";

import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER,
} from "../actions/types";

const initialState = {
  token: Cookies.get("token"),
  isAuth: false,
  loading: true,
  user: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuth: true,
        loading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
        isAuth: false,
        loading: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      Cookies.set("token", payload, { expires: 7 });
      return {
        ...state,
        token: payload,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};
