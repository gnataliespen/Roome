import React from "react";
import { Header, Icon, Segment, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

const AccountHeader = ({ user: { role, email, name, createdAt } }) => {
  return (
    <Segment secondary inverted color="violet">
      {role === "admin" && (
        <Label
          color="teal"
          size="large"
          ribbon
          icon="privacy"
          style={{ textTransform: "capitalize" }}
          content={role}
        />
      )}
      <Header inverted textAlign="center" as="h1" icon>
        <Icon name="user" />
        {name}
        <Header.Subheader>{email}</Header.Subheader>
        <Header.Subheader>Joined: {createdAt}</Header.Subheader>
      </Header>
    </Segment>
  );
};
AccountHeader.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AccountHeader;
