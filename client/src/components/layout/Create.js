import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import api from "../../util/apiConnection";
import axios from "axios";
import { setAlert } from "../../redux/actions/alert";
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

const Create = ({ setAlert, history }) => {
  const [form, setForm] = useState(initialForm);
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
    try {
      const { name, price, description } = form;
      const payload = { name, price, description, mediaUrl };
      const res = await api.post("/products/createe", payload);
      console.log(res);
      history.push("/");
    } catch (err) {
      ///////////
    }
    setLoading(false);
    setPosted(true);
    msgTimer();
    setForm(initialForm);
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
      if (err.response) {
        console.error(err.response.data.error);
        //setAlert("There was an error uploading your image.", "danger");
      }
      console.error(err);
      //setAlert("There was an error uploading your image.", "danger");
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

export default connect(
  null,
  { setAlert },
)(Create);
