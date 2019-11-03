import React, { Fragment, useState } from "react";
import api from "../util/apiConnection";
import axios from "axios";
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

const INITIAL_FORM = {
  name: "",
  price: 0,
  media: "",
  description: "",
};

const Create = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [preview, setPreview] = useState("");
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setForm({ ...form, media: files[0] });
      setPreview(window.URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let mediaUrl = await uploadImg();
    const { name, price, description } = form;
    const payload = { name, price, description, mediaUrl };
    const res = await api.post("/products/create", payload);
    setLoading(false);
    setPosted(true);
    msgTimer();
    setForm(INITIAL_FORM);
    setPreview("");
  };

  const msgTimer = () => {
    setTimeout(() => setPosted(false), 3000);
  };

  const uploadImg = async () => {
    const data = new FormData();
    data.append("file", form.media);
    data.append("upload_preset", "ecomProject");
    data.append("cloud_name", "gnatscloud");
    try {
      const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data);
      return res.data.url;
    } catch (err) {
      if (err.response.data.error) {
        console.log(err.response.data.error);
      }
      console.log(err);
    }
  };

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

export default Create;
