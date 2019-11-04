import { DELETE_PRODUCT, GET_PRODUCTS } from "./types";
import api from "../../util/apiConnection";

export const deleteProduct = id => async dispatch => {
  await api.delete(`/products/delete/${id}`);
  dispatch({
    type: DELETE_PRODUCT,
  });

  //setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
export const getProducts = id => async dispatch => {
  let res = await api.get("/products");
  dispatch({
    type: GET_PRODUCTS,
    payload: res.data,
  });

  //setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
