const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../config/config");
const Cart = require("../models/Cart");

//@route POST /auth/signup
//@desc Register user
//@access Public
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //Check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ msg: "Email already in use" });
    }

    //Hash password & create user
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPass });

    //Create cart for user
    const cart = await Cart.create({ user: newUser._id });

    //Create and return token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(201).json(token);
  } catch (err) {
    res.status(500).json({ msg: "Error, failed to register user" });
  }
};

//@route POST /auth/login
//@desc Login user
//@access Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Find user
    const user = await User.findOne({ email }).select("+password");
    //Check if user exists
    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    //Verify password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      //Create and send token
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1d",
      });
      return res.status(200).json(token);
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error, failed to login user" });
  }
};

//@route get /auth
//@desc Get user
//@access Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json(user);
  } catch (err) {
    return res.status(402).json({ msg: "Invalid token" });
  }
};
