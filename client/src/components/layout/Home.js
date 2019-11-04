import React, { useEffect } from "react";
import ProductList from "../products/ProductList";
import { connect } from "react-redux";
import { getProducts } from "../../redux/actions/product";
const Home = ({ getProducts, products }) => {
  //const [products, setProducts] = useState(false);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

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
