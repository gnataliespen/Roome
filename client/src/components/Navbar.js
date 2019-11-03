import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = ({ location }) => {
  const user = false;
  console.log(location);
  const isActive = route => {
    //return route === router.pathname;
  };

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link to="/">
          <Menu.Item active={isActive("/")} header>
            {/*add title/logo later*/}
            React ecomm
          </Menu.Item>
        </Link>
        <Link to="/cart">
          <Menu.Item active={isActive("/cart")} header>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>
        {user && (
          <Link to="/create">
            <Menu.Item active={isActive("/create")} header>
              <Icon name="add square" size="large" />
              Create
            </Menu.Item>
          </Link>
        )}
        {user ? (
          <>
            <Link to="/Account">
              <Menu.Item active={isActive("/account")} header>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>
            <Menu.Item header>
              <Icon name="sign out" size="large" />
              Log Out
            </Menu.Item>
          </>
        ) : (
          <>
            <Link to="/login">
              <Menu.Item active={isActive("/login")} header>
                <Icon name="sign in" size="large" />
                Log In
              </Menu.Item>
            </Link>
            <Link to="/signup">
              <Menu.Item active={isActive("/signup")} header>
                <Icon name="signup" size="large" />
                Sign Up
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
