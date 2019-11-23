import React from "react";
import { Header, Segment, Icon, Button, Item } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartItemList = ({ products, isAuth, removeFromCart }) => {
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
      )
    }));
  };

  if (products.length === 0) {
    return (
      <Segment secondary inverted textAlign="center" className="seg-header">
        <Header icon className="seg-text">
          <Icon name="shopping basket" />
          No products in your cart.
        </Header>
        <div>
          {isAuth ? (
            <Link to="/">
              <Button className="seg-btn">View Products</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="seg-btn">Login to add products</Button>
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
  removeFromCart: PropTypes.func.isRequired
};

export default CartItemList;
