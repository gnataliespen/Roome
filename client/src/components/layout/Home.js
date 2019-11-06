import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";

import ProductList from "../products/ProductList";
import { getProducts } from "../../redux/actions/product";

const Home = ({ getProducts, product: { products } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (products) {
    return <ProductList products={Object.values(products)} />;
  } else {
    return <Loader active />;
  }
};
Home.propTypes = {
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  { getProducts },
)(Home);
