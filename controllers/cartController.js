const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate("Product");
    console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Cannot GET cart" });
  }
};
