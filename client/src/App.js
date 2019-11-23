import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/auth";

//Components
import Navbar from "./components/layout/Navbar";
import Browse from "./components/layout/Browse";
import Product from "./components/products/Product";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Cart from "./components/cart/Cart";
import Create from "./components/layout/Create";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routes/PrivateRoute";
import Account from "./components/account/Account";
import "./css/style.css";
import Landing from "./components/layout/Landing";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <div id="main">
            <Route exact path="/products" component={Browse} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/checkout" component={Cart} />
            <PrivateRoute exact path="/create" admin component={Create} />
            <PrivateRoute exact path="/account" component={Account} />
          </div>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
