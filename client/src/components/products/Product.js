import React, { Fragment, useEffect, useState } from "react";
import ProductSummary from "./ProductSummary";
import ProductAttributes from "./ProductAttributes.js";
import api from "../../util/apiConnection";
//make it where if a product is passed it shoes it if not it gets one ffrom db and later redux state
const Product = ({ match }) => {
  const [product, setProduct] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let res = await api.get(`/products/product/${match.params.id}`);
        setProduct({ ...res.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [match.params.id]);
  if (product) {
    return (
      <Fragment>
        <ProductSummary {...product} />
        <ProductAttributes {...product} />
      </Fragment>
    );
  } else {
    return <div>home</div>;
  }
};

export default Product;
