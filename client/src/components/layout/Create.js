import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Header,
  Icon
} from "semantic-ui-react";

import { uploadImg } from "../../redux/actions/upload";
import { createProduct } from "../../redux/actions/product";

const initialForm = {
  name: "",
  price: 0,
  media: "",
  description: "",
  productType: "",
  //to check if the form has been submitted
  created: false
};

const Create = ({
  createProduct,
  uploadImg,
  product: { loading: productLoading, product },
  upload: { loading: uploadLoading, mediaUrl }
}) => {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setPreview(window.URL.createObjectURL(files[0]));
      getImgUrl(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, price, description, productType } = form;
    const payload = { name, price, description, mediaUrl, productType };
    setForm({ created: true });
    await createProduct(payload);
  };

  const getImgUrl = async file => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ecomProject");
    data.append("cloud_name", "gnatscloud");
    await uploadImg(data);
  };

  //Redirect after creating product
  if (form.created && product) {
    return <Redirect to={`/product/${product._id}`} />;
  }

  return (
    <Fragment>
      <Header as="h2" block>
        <Icon name="add" color="orange" /> Create new product
      </Header>
      <Form
        loading={(productLoading && form.created) || uploadLoading}
        onSubmit={e => handleSubmit(e)}
      >
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            required
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
            value={form.price}
            required
          />
          <Form.Field
            control={Input}
            name="productType"
            label="Product Type"
            type="text"
            onChange={handleChange}
            value={form.productType}
            required
          />
        </Form.Group>
        <Form.Field
          control={Input}
          name="media"
          label="Media"
          content="Select an image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <Image src={preview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          required
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
        />
      </Form>
    </Fragment>
  );
};
Create.propTypes = {
  uploadImg: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  upload: state.upload,
  product: state.product
});

export default connect(mapStateToProps, {
  uploadImg,
  createProduct
})(Create);
