import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { uploadImg, createProduct } from "../../redux/actions/upload";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";

const initialForm = {
  name: "",
  price: 0,
  media: "",
  description: "",
};

const Create = ({
  createProduct,
  uploadImg,
  upload: { product, mediaUrl },
}) => {
  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const { name, price, description } = form;
    const payload = { name, price, description, mediaUrl };
    await createProduct(payload);
    setLoading(false);
    setPosted(true);
    msgTimer();
    // setForm(initialForm);
    //setPreview("");
  };

  const msgTimer = () => {
    setTimeout(() => setPosted(false), 3000);
  };

  const getImgUrl = async file => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ecomProject");
    data.append("cloud_name", "gnatscloud");
    await uploadImg(data);
    setLoading(false);
  };
  if (product) {
    return <Redirect to={`/product/${product._id}`} />;
  }

  return (
    <Fragment>
      <Header as="h2" block>
        <Icon name="add" color="orange" /> Create new product
      </Header>
      <Form loading={loading} success={posted} onSubmit={e => handleSubmit(e)}>
        <Message
          success
          icon="check"
          header="Success"
          content="Added new product"
        />
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
            name="media"
            label="Media"
            content="Select an image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </Form.Group>
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
};

const mapStateToProps = state => ({
  upload: state.upload,
});

export default connect(
  mapStateToProps,
  { uploadImg, createProduct },
)(Create);
