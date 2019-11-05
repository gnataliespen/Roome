const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate("Product");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Cannot GET cart" });
  }
};
