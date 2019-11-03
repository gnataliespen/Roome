import React from "react";
import { Header, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const CartItemList = () => {
  const user = true;
  return (
    <Segment secondary color="teal" inverted textAlign="center">
      <Header icon>
        <Icon name="shopping basket"></Icon>
        No products in your cart.
      </Header>
      <div>
        {user ? (
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

export default CartItemList;
