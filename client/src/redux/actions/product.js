import {
  DELETE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  CREATE_PRODUCT,
  CREATE_FAILED,
} from "./types";
import api from "../../util/apiConnection";
import { setAlert } from "./alert";

export const deleteProduct = id => async dispatch => {
  await api.delete(`/products/delete/${id}`);
  dispatch({
    type: DELETE_PRODUCT,
  });

  //setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
export const getProducts = () => async dispatch => {
  let res = await api.get("/products");
  dispatch({
    type: GET_PRODUCTS,
    payload: res.data,
  });

  //setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
};
export const clearProduct = () => dispatch => {
  dispatch({ type: CLEAR_PRODUCT });
};
export const getProduct = id => async dispatch => {
  dispatch(clearProduct());
  let res = await api.get(`/products/product/${id}`);
  dispatch({
    type: GET_PRODUCT,
    payload: res.data,
  });
};
export const createProduct = product => async dispatch => {
  try {
    const res = await api.post("/products/create", product);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data.product,
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "red"));
    } else {
      dispatch(setAlert("Failed to create product", "red"));
    }
    dispatch({
      type: CREATE_FAILED,
    });
    return true;
  }
};
