import React, { Fragment, useEffect } from "react";
import ProductSummary from "./ProductSummary";
import ProductAttributes from "./ProductAttributes.js";
import api from "../../util/apiConnection";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct } from "../../redux/actions/product";

//make it where if a product is passed it shoes it if not it gets one ffrom db and later redux state
const Product = ({ match, product: { product, loading }, getProduct }) => {
  useEffect(() => {
    if (!product && loading) {
      getProduct(match.params.id);
    }
  }, [product, getProduct]);
  if (product) {
    return (
      <Fragment>
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Fragment>
    );
  } else if (loading) {
    return <div>home</div>;
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProduct },
)(Product);
