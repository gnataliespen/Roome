import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";

//Components
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Product from "./components/products/Product";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Cart from "./components/cart/Cart";
import Create from "./components/layout/Create";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routes/PrivateRoute";
import Account from "./components/account/Account";
import "./css/style.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div id="main">
          <Route exact path="/" component={Home} />
          <Alert />
          <Switch>
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/checkout" component={Cart} />
            <PrivateRoute exact path="/create" admin component={Create} />
            <PrivateRoute exact path="/account" component={Account} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
