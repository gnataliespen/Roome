import { combineReducers } from "redux";
import alerts from "./alert";
import auth from "./auth";
import upload from "./upload";
import product from "./product";
import cart from "./cart";
import orders from "./orders";

export default combineReducers({ alerts, auth, upload, product, cart, orders });
