import api from "../../util/apiConnection";

import { GET_ORDERS, GET_ORDERS_FAILED, CLEAR_ORDERS } from "./types";

//Clear orders
export const clearOrders = () => dispatch => {
  dispatch({ type: CLEAR_ORDERS });
};

//Get users orders
export const getOrders = () => async dispatch => {
  dispatch(clearOrders());
  try {
    const orders = await api.get("/auth/orders");
    dispatch({
      type: GET_ORDERS,
      payload: orders.data.orders,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERS_FAILED,
    });
  }
};
