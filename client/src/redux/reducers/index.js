import { combineReducers } from "redux";
import alerts from "./alert";
import auth from "./auth";
import upload from "./upload";
import product from "./product";

export default combineReducers({ alerts, auth, upload, product });
