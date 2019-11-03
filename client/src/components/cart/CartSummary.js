import React, { Fragment } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";

const CartSummary = () => {
  return (
    <Fragment>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $0.00
        <Button icon="cart" color="teal" floated="right" content="Checkout" />
      </Segment>
    </Fragment>
  );
};

export default CartSummary;
