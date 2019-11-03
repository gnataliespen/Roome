import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/products/Product";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Cookies from "js-cookie";

import "./css/style.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        {/* 
        
        <Route exact path="/checkout" component={Cart} />
        <Route exact path="/create" component={Create} />
  */}
      </Switch>
    </Router>
  );
};

export default App;
