import { Card } from "semantic-ui-react";
import React from "react";
const ProductList = ({ products }) => {
  const mapProductsToItem = products => {
    return products.map(product => ({
      header: product.name,
      image: product.mediaUrl,
      meta: `$${product.price}`,
      color: "teal",
      fluid: true,
      childkey: product._id,
      href: `/product/${product._id}`,
    }));
  };
  return (
    <Card.Group
      itemsPerRow="3"
      stackable
      centered
      items={mapProductsToItem(products)}
    />
  );
};

export default ProductList;
