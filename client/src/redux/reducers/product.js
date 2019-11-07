import {
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
  CLEAR_PRODUCT,
  CLEAR_PRODUCTS,
  CREATE_FAILED,
  CREATE_PRODUCT,
  DELETE_FAILED,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT_FAILED,
  SET_PAGE,
} from "../actions/types";

const initialState = {
  product: null,
  products: [],
  loading: true,
  totalPages: 1,
  activePage: 1,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRODUCT:
      return { loading: false, product: payload, mediaUrl: null };
    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: [...payload.products],
        totalPages: payload.totalPages,
      };
    case GET_PRODUCT:
      return { ...state, loading: false, product: payload };
    case SET_PAGE:
      return { ...state, activePage: payload };
    case DELETE_PRODUCT:
    case CREATE_FAILED:
    case GET_PRODUCT_FAILED:
      return { ...state, product: null, loading: false };
    case GET_PRODUCTS_FAILED:
      return { ...state, products: [], loading: false, totalPages: 1 };
    case DELETE_FAILED:
      return { ...state, loading: false };
    case CLEAR_PRODUCT:
    case CLEAR_PRODUCTS:
      return { ...state, product: null, loading: true };
    default:
      return state;
  }
};
