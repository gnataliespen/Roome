const Product = require("../models/Product");
const Cart = require("../models/Cart");
const pagination = require("../util/pagination");

//@route GET /products/:page
//@desc Get list of products
//@access Public
exports.getProducts = async (req, res) => {
  const pageNum = req.params.page || 1;
  let query = req.query.type ? { productType: req.query.type } : {};
  resObj = await pagination(pageNum, query);
  res.status(200).json(resObj);
};

//@route GET /products/product/:id
//@desc Get product by id
//@access Public
exports.getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ msg: "Error, product was not found" });
  }
};
//@route DELETE /products/delete/:id
//@desc Delete a product
//@access Private can only be used by admin
exports.deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    //Delete by id
    await Product.findByIdAndDelete({ _id });
    //Remove from all carts
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    );
    res.status(200).json({ msg: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error, product was not deleted" });
  }
};

//@route POST /products/create
//@desc Create a product
//@access Private can only be used by admin
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ msg: "Error, product was not created" });
  }
};
