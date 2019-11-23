const Order = require("../models/Order");

//@route GET /orders
//@desc Get users orders
//@access Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user })
      .sort({ createdAt: "desc" })
      .populate({
        path: "products.product",
        model: "Product",
      });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(404).json({ msg: "Error, no orders found" });
  }
};
