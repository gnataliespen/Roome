import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";

import { getProduct } from "../../redux/actions/product";
import ProductSummary from "./ProductSummary";
import ProductAttributes from "./ProductAttributes.js";

const Product = ({ match, product: { product, loading }, getProduct }) => {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct, match.params.id]);
  if (loading) {
    return <Loader active />;
  }
  return (
    <Fragment>
      <ProductSummary {...product} />
      <ProductAttributes {...product} />
    </Fragment>
  );
};
Product.propTypes = {
  product: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProduct },
)(Product);
