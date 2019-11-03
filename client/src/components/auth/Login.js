import React, { Fragment, useState } from "react";
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

const INITIAL_USER = {
  email: "",
  password: "",
};

const Login = () => {
  const [user, setUser] = useState(INITIAL_USER);
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

export default Login;
