import { combineReducers } from "redux";
import alerts from "./alert";
import auth from "./auth";
import upload from "./upload";

export default combineReducers({ alerts, auth, upload });
