import { UPLOAD_IMG, UPLOAD_FAILED, CLEAR_UPLOAD } from "../actions/types";

const initialState = {
  loading: true,
  mediaUrl: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_IMG:
      return { ...state, loading: false, mediaUrl: payload };
    case CLEAR_UPLOAD:
      return { loading: false, mediaUrl: null };
    case UPLOAD_FAILED:
      return { ...state, loading: false, mediaUrl: null };
    default:
      return state;
  }
};
