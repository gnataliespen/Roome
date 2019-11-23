import React, { Fragment } from "react";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../redux/actions/cart";

const AddProductToCart = ({ isAuth, addToCart, id, loading }) => {
  let history = useHistory();

  return (
    <Fragment>
      {isAuth ? (
        <Button
          loading={loading}
          className="seg-btn"
          onClick={() => addToCart(id)}
        >
          <Icon className="plus cart" /> Add to cart
        </Button>
      ) : (
        <Button className="seg-btn" onClick={() => history.push("/login")}>
          <Icon className="user" /> Login to purchase
        </Button>
      )}
    </Fragment>
  );
};
AddProductToCart.propTypes = {
  isAuth: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  loading: state.cart.loading
});
export default connect(mapStateToProps, { addToCart })(AddProductToCart);
