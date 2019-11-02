import React from "react";
import { Menu, Container, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = ({ location }) => {
  const user = true;
  console.log(location);
  const isActive = route => {
    //return route === router.pathname;
  };

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item active={isActive("/")} header>
            {/*add title/logo later*/}
            React ecomm
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item active={isActive("/cart")} header>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>
        {user && (
          <Link href="/create">
            <Menu.Item active={isActive("/create")} header>
              <Icon name="add square" size="large" />
              Create
            </Menu.Item>
          </Link>
        )}
        {user ? (
          <>
            <Link href="/Account">
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
            <Link href="/login">
              <Menu.Item active={isActive("/login")} header>
                <Icon name="sign in" size="large" />
                Log In
              </Menu.Item>
            </Link>
            <Link href="/signup">
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
