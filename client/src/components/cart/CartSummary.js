import React, { Fragment } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import calculateCartTotal from "../../util/calculateCartTotal";
import PropTypes from "prop-types";

const CartSummary = ({ products }) => {
  let totals = calculateCartTotal(products);
  return (
    <Fragment>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${totals.cartTotal}
        <Button
          icon="cart"
          color="teal"
          floated="right"
          content="Checkout"
          disabled={products.length === 0}
        />
      </Segment>
    </Fragment>
  );
};
CartSummary.propTypes = {
  products: PropTypes.array.isRequired,
};
export default CartSummary;
