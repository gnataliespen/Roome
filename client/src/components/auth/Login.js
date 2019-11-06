import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Message,
  Segment,
  Form,
  Icon,
  Button,
  Divider,
} from "semantic-ui-react";

import { login } from "../../redux/actions/auth";

const initialUser = {
  email: "",
  password: "",
};

const Login = ({ login, isAuth }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await login(user);
    setLoading(false);
  };

  //Redirect if logged in
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Message attached icon="privacy" header="Welcome Back!" color="blue" />
      <Divider className="hidden" />
      <Form loading={loading} onSubmit={handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <Button icon="sign in" type="submit" color="orange" content="Login" />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Dont have an account? <Link to="/signup">Sign up here.</Link>
      </Message>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});
export default connect(
  mapStateToProps,
  { login },
)(Login);
