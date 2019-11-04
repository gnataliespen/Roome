import {
  UPLOAD_IMG,
  UPLOAD_FAILED,
  CREATE_PRODUCT,
  CREATE_FAILED,
  CLEAR_UPLOAD,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import api from "../../util/apiConnection";

export const uploadImg = data => async dispatch => {
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
      dispatch(setAlert(`CLOUDINARY ERROR: ${msg}`, "danger"));
    } else {
      dispatch(setAlert("Failed to upload image", "danger"));
    }
  }
};
export const createProduct = product => async dispatch => {
  try {
    const res = await api.post("/products/createe", product);
    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data.product,
    });
    setTimeout(() => dispatch({ type: CLEAR_UPLOAD }), 1000);
  } catch (err) {
    const error = err.response.data.msg;
    if (error) {
      dispatch(setAlert(error, "danger"));
    } else {
      dispatch(setAlert("Failed to create product", "danger"));
    }
    dispatch({
      type: CREATE_FAILED,
    });
  }
};
