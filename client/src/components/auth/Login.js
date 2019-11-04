import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import api from "../../util/apiConnection";
import {
  Message,
  Segment,
  Form,
  Icon,
  Button,
  Divider,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { handleLogin } from "../../util/auth";
import PropTypes from "prop-types";

const initialUser = {
  email: "",
  password: "",
};

const Login = ({ setAlert }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await api.post("/auth/login", user);
      handleLogin(res.data);
    } catch (err) {
      console.error(err);
      setAlert("Login failed", "danger");
    }
    setLoading(false);
  };

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
  setAlert: PropTypes.func.isRequired,
};

export default connect(
  null,
  { setAlert },
)(Login);
