import { GET_CART } from "./types";
import api from "../../util/apiConnection";

export const getCart = (msg, alertType) => async dispatch => {
  let cart = await api.get("/cart");
  dispatch({
    type: GET_CART,
    payload: cart.data,
  });
};
