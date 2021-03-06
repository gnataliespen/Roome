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
  Divider
} from "semantic-ui-react";

import { register } from "../../redux/actions/auth";
import { setAlert } from "../../redux/actions/alert";

const initialUser = {
  name: "",
  email: "",
  password: "",
  conPass: ""
};

const SignUp = ({ auth: { isAuth, loading }, register, setAlert }) => {
  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password, conPass } = user;
    if (password === conPass) {
      await register({ name, email, password });
    } else {
      setAlert("Passwords do not match", "red");
    }
  };

  //Redirect if logged in
  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Message
        attached
        icon="settings"
        header="Create a new account"
        className="seg-btn"
      />
      <Divider className="hidden" />
      <Form loading={loading} onSubmit={handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            label="Name"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            minLength={3}
            maxLength={14}
            required
          />
          <Form.Input
            fluid
            icon="envelope"
            iconPosition="left"
            label="Email"
            placeholder="Email"
            type="email"
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
            minLength={6}
            value={user.password}
            onChange={handleChange}
            required
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            label="Confirm Password"
            placeholder="Confirm Password"
            type="password"
            name="conPass"
            value={user.conPass}
            onChange={handleChange}
            minLength={6}
            required
          />
          <Button
            icon="signup"
            type="submit"
            content="Signup"
            className="seg-header"
          />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user? <Link to="/login">Login here.</Link>
      </Message>
    </Fragment>
  );
};
SignUp.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register, setAlert })(SignUp);
