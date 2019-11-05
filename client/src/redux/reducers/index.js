import { combineReducers } from "redux";
import alerts from "./alert";
import user from "./user";
import upload from "./upload";
import product from "./product";

export default combineReducers({ alerts, user, upload, product });
