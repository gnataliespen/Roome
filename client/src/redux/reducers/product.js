import {
  GET_PRODUCTS,
  GET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return { ...state, loading: false, products: [...payload] };
    case DELETE_PRODUCT:
      return { ...state, product: null, loading: false };
    default:
      return state;
  }
};
