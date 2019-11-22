import api from "../../util/apiConnection";
import { setAlert } from "./alert";
import {
  DELETE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  CLEAR_PRODUCT,
  CLEAR_PRODUCTS,
  CREATE_PRODUCT,
  CREATE_FAILED,
  DELETE_FAILED,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_FAILED,
  SET_PAGE
} from "./types";

//Delete a product (admin only)
export const deleteProduct = id => async dispatch => {
  try {
    await api.delete(`/products/delete/${id}`);
    dispatch({
      type: DELETE_PRODUCT
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "red"));
    } else {
      dispatch(setAlert("Failed to delete product", "red"));
    }
    dispatch({
      type: DELETE_FAILED
    });
  }
};

//Get list of products
export const getProducts = (page = 1) => async dispatch => {
  dispatch(clearProducts());
  try {
    let res = await api.get(`/products/${page}`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "red"));
    } else {
      dispatch(setAlert("Failed to get products list", "red"));
    }
    dispatch({
      type: GET_PRODUCTS_FAILED
    });
  }
};
//Clear products state
export const clearProducts = () => dispatch => {
  dispatch({ type: CLEAR_PRODUCTS });
};
//Clear product state
export const clearProduct = () => dispatch => {
  dispatch({ type: CLEAR_PRODUCT });
};
//Get product by id
export const getProduct = id => async dispatch => {
  dispatch(clearProduct());
  try {
    let res = await api.get(`/products/product/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "red"));
    } else {
      dispatch(setAlert("Failed to get product", "red"));
    }
    dispatch({
      type: GET_PRODUCT_FAILED
    });
  }
};
//Create product
export const createProduct = product => async dispatch => {
  dispatch({ type: CLEAR_PRODUCT });

  try {
    const res = await api.post("/products/create", product);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data.product
    });
    dispatch(getProducts());
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "red"));
    } else {
      dispatch(setAlert("Failed to create product", "red"));
    }
    dispatch({
      type: CREATE_FAILED
    });
  }
};
//Set active page
export const setActivePage = page => dispatch => {
  dispatch({
    type: SET_PAGE,
    payload: page
  });
};
