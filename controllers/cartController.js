const Cart = require("../models/Cart");

//@route GET /cart
//@desc Get users cart
//@access Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate("Product");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ msg: "Error, cannot get cart" });
  }
};

//@route PUT /cart/add
//@desc Add item to users cart
//@access Private
exports.addToCart = async (req, res) => {
  try {
    const { _id } = req.body;

    //Get users cart
    const cart = await Cart.findOne({ user: req.user }).populate("Product");

    //Check if product is already in cart
    const cartIncludes = cart.products.some(doc => doc.product == _id);

    //If so increment quantity
    if (cartIncludes) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, "products.product": { _id } },
        { $inc: { "products.$.quantity": 1 } },
      );
    } else {
      // Or add it to the set
      const newProduct = { product: _id };
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } },
      );
    }
    res.status(200).json({ msg: "Added to cart" });
  } catch (err) {
    res.status(500).json({ msg: "Error, Could not add to cart" });
  }
};
