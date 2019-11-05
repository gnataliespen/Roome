import React, { Fragment, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../redux/actions/user";
const AddProductToCart = ({ isAuth, addToCart, id }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleAdd = async () => {
    setLoading(true);
    await addToCart(id);
    setLoading(false);
  };
  return (
    <Fragment>
      {isAuth ? (
        <Button loading={loading} color="orange" onClick={() => handleAdd()}>
          <Icon className="plus cart" /> Add to cart
        </Button>
      ) : (
        <Button color="blue" onClick={() => history.push("/login")}>
          <Icon className="user" /> Login to purchase
        </Button>
      )}
    </Fragment>
  );
};
AddProductToCart.propTypes = {
  isAuth: PropTypes.bool,
  addToCart: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
});
export default connect(
  mapStateToProps,
  { addToCart },
)(AddProductToCart);
