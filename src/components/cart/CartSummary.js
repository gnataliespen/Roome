import React, { Fragment } from "react";
import { Button, Divider, Segment } from "semantic-ui-react";
import StripeCheckout from "react-stripe-checkout";
import PropTypes from "prop-types";

import calculateCartTotal from "../../util/calculateCartTotal";

const CartSummary = ({ products, handleCheckout }) => {
  let totals = calculateCartTotal(products);
  return (
    <Fragment>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> ${totals.cartTotal}
        <StripeCheckout
          name="Roome"
          amount={totals.stripeTotal}
          image={products.length > 0 ? products[0].product.mediaUrl : ""}
          currency="USD"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={handleCheckout}
          triggerEvent="onClick"
        >
          <Button
            icon="cart"
            className="seg-btn"
            floated="right"
            content="Checkout"
            disabled={products.length === 0}
          />
        </StripeCheckout>
      </Segment>
    </Fragment>
  );
};
CartSummary.propTypes = {
  products: PropTypes.array.isRequired,
  handleCheckout: PropTypes.func.isRequired
};
export default CartSummary;
