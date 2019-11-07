import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Loader } from "semantic-ui-react";

import AccountHeader from "./AccountHeader";
import AccountOrder from "./AccountOrder";
import { getOrders, clearOrders } from "../../redux/actions/orders";

const Account = ({ user, orders, getOrders }) => {
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (orders.loading) {
    return <Loader active />;
  }
  return (
    <Segment>
      <AccountHeader user={user} />
      <AccountOrder orders={orders} />
    </Segment>
  );
};
Account.propTypes = {
  user: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  clearOrders: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  user: state.auth.user,
  orders: state.orders,
});

export default connect(
  mapStateToProps,
  { getOrders, clearOrders },
)(Account);
