import api from "../../util/apiConnection";
import { setAlert } from "./alert";
import {
  GET_CART,
  UPDATE_CART,
  GET_CART_FAILED,
  CLEAR_CART,
  CHECKOUT,
} from "./types";

//Get Cart
export const getCart = () => async dispatch => {
  dispatch(clearCart());
  try {
    let cart = await api.get("/cart");
    dispatch({
      type: GET_CART,
      payload: cart.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CART_FAILED,
    });
  }
};
//Add to Cart
export const addToCart = product => async dispatch => {
  try {
    let newCart = await api.put("/cart/add", { _id: product });
    dispatch({
      type: UPDATE_CART,
      payload: newCart.data,
    });
    dispatch(setAlert("Added to cart", "green"));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "red"));
    dispatch(getCart());
  }
};
//Remove item from cart
export const removeFromCart = product => async dispatch => {
  try {
    let newCart = await api.put("/cart/remove", { _id: product });
    dispatch({
      type: UPDATE_CART,
      payload: newCart.data,
    });
    dispatch(setAlert("Removed from cart", "yellow"));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, "red"));
    dispatch(getCart());
  }
};
//Clear cart
export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART,
  });
};

export const handleCheckout = paymentData => async dispatch => {
  try {
    let res = await api.post("/cart/checkout", { ...paymentData });
    dispatch({
      type: CHECKOUT,
    });
    dispatch(setAlert(res.data.msg, "green"));
  } catch (err) {
    if (err.response.data.msg) {
      dispatch(setAlert(err.response.data.msg, "red"));
    }
    dispatch(setAlert("Checkout failed", "red"));
  }
};
