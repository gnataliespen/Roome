import React, { Fragment } from "react";
import { Segment, Loader } from "semantic-ui-react";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeFromCart } from "../../redux/actions/cart";

const Cart = ({
  removeFromCart,
  cart: { loading: cartLoading, products },
  auth: { loading: authLoading, isAuth },
}) => {
  return (
    <Segment>
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
          <CartSummary products={products} />
        </Fragment>
      )}
    </Segment>
  );
};
Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { removeFromCart },
)(Cart);
