import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

import ProductList from "../products/ProductList";
import ProductPagination from "../products/ProductPagination";
import { getProducts, setActivePage } from "../../redux/actions/product";

const Browse = ({
  setActivePage,
  getProducts,
  product: { products, totalPages, activePage, loading }
}) => {
  let location = useLocation();
  useEffect(() => {
    const queries = location.search.split("&");
    const num = (queries[0] && queries[0].split("=")[1]) || 1;
    const type = (queries[1] && queries[1].split("=")[1]) || null;

    setActivePage(num);
    getProducts(activePage, type);
  }, [getProducts, activePage, location.search, setActivePage]);

  if (loading) {
    return <Loader active />;
  }
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
Browse.propTypes = {
  product: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getProducts, setActivePage })(Browse);
