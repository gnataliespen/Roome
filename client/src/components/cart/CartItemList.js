import React from "react";
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CartItemList = ({ isAuth }) => {
  return (
    <Segment secondary color="teal" inverted textAlign="center">
      <Header icon>
        <Icon name="shopping basket"></Icon>
        No products in your cart.
      </Header>
      <div>
        {isAuth ? (
          <Button color="orange">
            <Link to="/">View Products</Link>
          </Button>
        ) : (
          <Button color="blue">Login to add products</Button>
        )}
      </div>
    </Segment>
  );
};
CartItemList.propTypes = {
  isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps)(CartItemList);
