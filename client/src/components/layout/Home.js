import React, { useEffect, useState } from "react";
import ProductList from "../products/ProductList";
import { connect } from "react-redux";

import api from "../../util/apiConnection";
import { getProducts } from "../../redux/actions/product";
const Home = ({ getProducts, products }) => {
  //const [products, setProducts] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);

  if (products) {
    return <ProductList products={Object.values(products)} />;
  } else {
    return <div>home</div>;
  }
};

const mapStateToProps = state => ({
  products: state.product.products,
});

export default connect(
  mapStateToProps,
  { getProducts },
)(Home);
