import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountHeader from "./AccountHeader";
import AccountOrder from "./AccountOrder";
import { getOrders, clearOrders } from "../../redux/actions/orders";

const Account = ({ user, orders, getOrders, clearOrders }) => {
  useEffect(() => {
    getOrders();
    return function cleanup() {
      clearOrders();
    };
  }, [getOrders, clearOrders]);
  return (
    <Fragment>
      <AccountHeader user={user} />
      <AccountOrder orders={orders} />
    </Fragment>
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
