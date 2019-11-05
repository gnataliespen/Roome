import React, { Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";

import { getProduct, clearProduct } from "../../redux/actions/product";
import ProductSummary from "./ProductSummary";
import ProductAttributes from "./ProductAttributes.js";

const Product = ({
  match,
  product: { product, loading },
  getProduct,
  clearProduct,
}) => {
  useEffect(() => {
    getProduct(match.params.id);
    return function cleanup() {
      clearProduct();
    };
  }, [getProduct, match.params.id, clearProduct]);

  if (product) {
    return (
      <Fragment>
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Fragment>
    );
  } else if (loading) {
    return <Loader active />;
  } else {
    return <Redirect to="/" />;
  }
};
Product.propTypes = {
  product: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProduct, clearProduct },
)(Product);
