import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import api from "../util/apiConnection";
const Home = () => {
  const [products, setProducts] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let res = await api.get("/products");
        setProducts({ ...res.data });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  if (products) {
    return <ProductList products={Object.values(products)} />;
  } else {
    return <div>home</div>;
  }
};
export default Home;
