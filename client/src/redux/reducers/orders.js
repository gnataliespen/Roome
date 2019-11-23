import { GET_ORDERS, GET_ORDERS_FAILED, CLEAR_ORDERS } from "../actions/types";

const initialState = { loading: true, orders: [] };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
      return { ...state, loading: false, orders: [...payload] };
    case GET_ORDERS_FAILED:
      return { ...state, loading: false, orders: [] };
    case CLEAR_ORDERS:
      return { ...state, loading: true, orders: [] };
    default:
      return state;
  }
};
