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
  name: "",
  email: "",
  password: "",
  conPass: "",
};

const SignUp = () => {
  const [user, setUser] = useState(INITIAL_USER);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, conPass } = user;
    if (password === conPass) {
      try {
        let res = await api.post("/auth/signup", { name, email, password });
        handleLogin(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Passwords do not match");
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Message
        attached
        icon="settings"
        header="Create a new account"
        color="teal"
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
          <Button icon="signup" type="submit" color="orange" content="Signup" />
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help" />
        Existing user? <Link to="/login">Login here.</Link>
      </Message>
    </Fragment>
  );
};

export default SignUp;
