import React, { Fragment, useState } from "react";
import { Header, Button, Modal } from "semantic-ui-react";
import api from "../../util/apiConnection";

const ProductAttributes = ({ description, _id }) => {
  const [modal, setModal] = useState(false);

  const handleDelete = async () => {
    await api.delete(`/products/delete/${_id}`);
    //router.push("/");
  };

  return (
    <Fragment>
      <Header as="h3">About this product</Header>
      <p>{description}</p>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete Product"
        onClick={() => setModal(true)}
      />
      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this product?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setModal(false)} />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default ProductAttributes;
