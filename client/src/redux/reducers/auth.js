import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/types";
import Cookies from "js-cookie";

const initialState = {
  token: Cookies.get("token"),
  isAuth: null,
  loading: true,
  user: null,
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

    case REGISTER_SUCCESS:
      Cookies.set("token", payload, { expires: 7 });
      return {
        ...state,
        token: payload,
        isAuth: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };

    default:
      return state;
  }
};
