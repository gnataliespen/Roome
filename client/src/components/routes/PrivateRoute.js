import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { user, loading, isAuth },
  admin = false,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        (!isAuth && !loading) || (admin && user && user.role !== "admin") ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);