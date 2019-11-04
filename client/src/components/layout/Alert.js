import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Message } from "semantic-ui-react";

const Alert = ({ alerts }) =>
  alerts !== undefined &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Message key={alert.id} content={alert.msg} color={alert.alertType} />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
