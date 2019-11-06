import React, { Fragment, useState } from "react";
import { Segment, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import { removeFromCart, handleCheckout } from "../../redux/actions/cart";

const Cart = ({
  handleCheckout,
  removeFromCart,
  cart: { loading: cartLoading, products },
  auth: { loading: authLoading, isAuth },
}) => {
  useState(false);
  const [loading, setLoading] = useState(false);

  const checkout = async paymentData => {
    setLoading(true);
    await handleCheckout(paymentData);
    setLoading(false);
  };
  return (
    <Segment loading={loading}>
      {cartLoading ? (
        <Loader active />
      ) : (
        <Fragment>
          <CartItemList
            products={products}
            loading={authLoading}
            isAuth={isAuth}
            removeFromCart={removeFromCart}
          />
          <CartSummary handleCheckout={checkout} products={products} />
        </Fragment>
      )}
    </Segment>
  );
};
Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { removeFromCart, handleCheckout },
)(Cart);
