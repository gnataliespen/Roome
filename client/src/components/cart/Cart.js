import React, { Fragment, useState, useEffect } from "react";
import { Segment, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import {
  removeFromCart,
  handleCheckout,
  getCart,
} from "../../redux/actions/cart";

const Cart = ({
  handleCheckout,
  removeFromCart,
  getCart,
  cart: { loading: cartLoading, products },
  auth: { loading: authLoading, isAuth },
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCart();
  }, [getCart]);

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
  getCart: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { removeFromCart, handleCheckout, getCart },
)(Cart);
