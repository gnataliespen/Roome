import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

import ProductList from "../products/ProductList";
import ProductPagination from "../products/ProductPagination";
import { getProducts, setActivePage } from "../../redux/actions/product";

const Home = ({
  setActivePage,
  getProducts,
  product: { products, totalPages, activePage, loading }
}) => {
  let location = useLocation();
  useEffect(() => {
    let page = location.search.slice(-1) || 1;
    setActivePage(page);
    getProducts(activePage);
  }, [getProducts, activePage, location.search, setActivePage]);

  if (loading) {
    return <Loader active />;
  }
  console.log("home");
  if (products) {
    return (
      <Fragment>
        <ProductList products={products} />
        <ProductPagination
          setActivePage={setActivePage}
          activePage={activePage}
          totalPages={totalPages}
        />
      </Fragment>
    );
  }
};
Home.propTypes = {
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProducts, setActivePage })(Home);
