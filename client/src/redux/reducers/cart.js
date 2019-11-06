import {
  GET_CART_FAILED,
  GET_CART,
  UPDATE_CART,
  CLEAR_CART,
} from "../actions/types";
const initialState = {
  loading: true,
  products: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
    case UPDATE_CART:
      return {
        ...state,
        loading: false,
        products: [...payload],
      };
    case GET_CART_FAILED:
    case CLEAR_CART:
      return {
        ...state,
        loading: false,
        products: [],
      };
    default:
      return state;
  }
};
