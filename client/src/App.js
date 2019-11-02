import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Switch>
        {/* <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/checkout" component={Cart} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/product/:id" component={Product} />
  */}
      </Switch>
    </Router>
  );
};

export default App;
