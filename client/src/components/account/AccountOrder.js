import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import {
  Header,
  Label,
  Accordion,
  List,
  Image,
  Button,
  Segment,
  Icon,
} from "semantic-ui-react";

import formatDate from "../../util/formatDate";

const AccountOrder = ({ orders: { orders, loading } }) => {
  let history = useHistory();

  const mapOrdersToPannels = orders => {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)} />,
      },
      content: {
        content: (
          <Fragment>
            <List.Header as="h3">
              Total: ${order.total}
              <Label
                content={order.email}
                icon="mail"
                basic
                horizontal
                style={{ marginLeft: "1em" }}
              />
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item key={p.product._id}>
                  <Image avatar src={p.product.mediaUrl} />
                  <List.Content>
                    <List.Header>
                      <Link
                        to={`/product/${p.product._id}`}
                        style={{ color: "black" }}
                      >
                        {p.product.name}
                      </Link>
                    </List.Header>
                    <List.Description>
                      {p.quantity} | ${p.product.price}
                    </List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="red" size="tiny">
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Fragment>
        ),
      },
    }));
  };
  return (
    <Fragment>
      <Header as="h2">
        <Icon name="folder open" />
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment textAlign="center" inverted tertiary color="grey">
          <Header icon>
            <Icon name="copy outline" />
            No past orders
          </Header>
          <div>
            <Button onClick={() => history.push("/")} color="orange">
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion
          fluid
          styled
          exclusive={false}
          panels={mapOrdersToPannels(orders)}
        />
      )}
    </Fragment>
  );
};
AccountOrder.propTypes = {
  orders: PropTypes.object.isRequired,
};
export default AccountOrder;
