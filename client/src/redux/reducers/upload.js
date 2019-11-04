import {
  CREATE_PRODUCT,
  CREATE_FAILED,
  UPLOAD_IMG,
  UPLOAD_FAILED,
  CLEAR_UPLOAD,
} from "../actions/types";

const initialState = {
  product: null,
  loading: true,
  mediaUrl: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRODUCT:
      return { loading: false, product: payload, mediaUrl: null };
    case UPLOAD_IMG:
      return { ...state, loading: false, mediaUrl: payload };
    case CREATE_FAILED:
    case CLEAR_UPLOAD:
      return { loading: false, product: null, mediaUrl: null };
    case UPLOAD_FAILED:
      return { ...state, loading: false, mediaUrl: null };
    default:
      return state;
  }
};
