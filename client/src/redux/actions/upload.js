import { UPLOAD_IMG, UPLOAD_FAILED, CLEAR_UPLOAD } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const uploadImg = data => async dispatch => {
  dispatch(clearUpload());
  try {
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
    dispatch({
      type: UPLOAD_IMG,
      payload: res.data.url,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_FAILED,
    });
    if (err.response) {
      let msg = err.response.data.error.message;
      dispatch(setAlert(`CLOUDINARY ERROR: ${msg}`, "red"));
    } else {
      dispatch(setAlert("Failed to upload image", "red"));
    }
  }
};
export const clearUpload = () => dispatch => {
  dispatch({ type: CLEAR_UPLOAD });
};
