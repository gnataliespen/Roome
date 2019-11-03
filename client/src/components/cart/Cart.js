import React from "react";
import { Segment } from "semantic-ui-react";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";

const cart = () => {
  return (
    <Segment>
      <CartItemList />
      <CartSummary />
    </Segment>
  );
};

export default cart;
