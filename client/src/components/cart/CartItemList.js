import React from "react";
import { Header, Segment, Icon, Button, Item, Loader } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartItemList = ({ loading, products, isAuth, removeFromCart }) => {
  let history = useHistory();
  const mapCartToItems = products => {
    return products.map(p => ({
      childkey: p.product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => history.push(`/product/${p.product._id}`)}
        >
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => removeFromCart(p.product._id)}
        />
      ),
    }));
  };

  if (loading) {
    return <Loader active />;
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center">
        <Header icon>
          <Icon name="shopping basket"></Icon>
          No products in your cart.
        </Header>
        <div>
          {isAuth ? (
            <Link to="/">
              <Button color="orange">View Products</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button color="blue">Login to add products</Button>
            </Link>
          )}
        </div>
      </Segment>
    );
  }
  return <Item.Group divided items={mapCartToItems(products)} />;
};
CartItemList.propTypes = {
  isAuth: PropTypes.bool,
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItemList;
