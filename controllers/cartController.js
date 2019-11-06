const Cart = require("../models/Cart");
const Stripe = require("stripe");
const Order = require("../models/Order");
const uuid = require("uuid/v4");

const calculateCartTotal = require("../util/calculateCartTotal");
const { stripeSecret } = require("../config/config");
const stripe = Stripe(stripeSecret);

//@route GET /cart
//@desc Get users cart
//@access Private
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user }).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
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
    const cart = await Cart.findOne({ user: req.user });

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
    //Get updated cart
    const updatedCart = await Cart.findOne({ user: req.user }).populate({
      path: "products.product",
      model: "Product",
    });

    res.status(200).json(updatedCart.products);
  } catch (err) {
    res.status(500).json({ msg: "Error, Could not add to cart" });
  }
};

//@route PUT /cart/remove
//@desc remove a product from users cart
//@access Private
exports.removeFromCart = async (req, res) => {
  try {
    const { _id } = req.body;

    let cart = await Cart.findOneAndUpdate(
      { user: req.user },
      { $pull: { products: { product: _id } } },
      { new: true },
    ).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  } catch (err) {
    res.status(500).json({ msg: "Error, cannot update cart" });
  }
};

//@route POST /cart/checkout
//@desc process order
//@access Private
exports.checkOut = async (req, res) => {
  const paymentData = req.body;
  try {
    //Get cart
    const cart = await Cart.findOne({ user: req.user }).populate({
      path: "products.product",
      model: "Product",
    });

    //Doublecheck total
    const total = calculateCartTotal(cart.products);
    let { stripeTotal, cartTotal } = total;

    //Check if email is linked with existing stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });

    //If not create new stripe customer
    let newCustomer;
    if (prevCustomer.data.length === 0) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }

    const customer = (newCustomer && newCustomer.id) || prevCustomer.data[0].id;

    //Create charge with total, send receipt to email
    await stripe.charges.create(
      {
        currency: "usd",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuid(),
      },
    );

    //Add order to db
    await Order.create({
      user: req.user,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    });

    //Clear cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });

    //Send success (200) response
    res.status(200).json({ msg: "Checkout successful" });
  } catch (err) {
    res.status(500).json({ msg: "Error, Could not complete purchase" });
  }
};
