const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    let productList = await Product.find();
    res.status(200).json(productList);
  } catch (err) {
    res.status(500).json({ msg: "Cannot GET products" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ msg: "Error, product was not found" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    await Product.findByIdAndDelete({ _id });
    res.status(200).json({ msg: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error, product was not deleted" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ msg: "Error, product was not created" });
  }
};
