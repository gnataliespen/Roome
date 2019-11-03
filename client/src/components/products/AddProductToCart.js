import React from "react";
import { Button, Icon } from "semantic-ui-react";

const AddProductToCart = () => {
  return (
    <Button color="orange">
      <Icon className="plus cart" /> Add to cart
    </Button>
  );
};

export default AddProductToCart;
