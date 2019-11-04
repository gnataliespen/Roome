import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Product from "./components/products/Product";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Cart from "./components/cart/Cart";
import Create from "./components/layout/Create";
import Alert from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import "./css/style.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Alert />
        <Switch>
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/checkout" component={Cart} />
          <Route exact path="/create" component={Create} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
