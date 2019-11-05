import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../redux/actions/user";

const Navbar = ({ user: { isAuth, loading, user }, logout }) => {
  let location = useLocation();

  const isActive = route => {
    return route === location.pathname;
  };

  return (
    <Menu stackable id="menu" inverted>
      <Container text>
        <Link to="/">
          <Menu.Item active={isActive("/")} header>
            {/*add title/logo later*/}
            React ecomm
          </Menu.Item>
        </Link>
        <Link to="/checkout">
          <Menu.Item active={isActive("/checkout")} header>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>
        {user && user.role === "admin" && (
          <Link to="/create">
            <Menu.Item active={isActive("/create")} header>
              <Icon name="add square" size="large" />
              Create
            </Menu.Item>
          </Link>
        )}
        {!loading && isAuth ? (
          <>
            <Link to="/Account">
              <Menu.Item active={isActive("/account")} header>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>
            <Menu.Item header onClick={e => logout()}>
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
Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
