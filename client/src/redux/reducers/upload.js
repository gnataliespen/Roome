import {
  UPLOAD_IMG,
  UPLOAD_FAILED,
  CLEAR_UPLOAD,
  PREP_UPLOAD,
} from "../actions/types";

const initialState = {
  loading: false,
  mediaUrl: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_IMG:
      return { ...state, loading: false, mediaUrl: payload };
    case PREP_UPLOAD:
      return { ...state, loading: true, mediaUrl: null };
    case UPLOAD_FAILED:
    case CLEAR_UPLOAD:
      return { ...state, loading: false, mediaUrl: null };
    default:
      return state;
  }
};
