const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../config/config");

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
    //const cart = await Cart.create({ user: newUser._id });

    //Create and return token
    const token = jwt.sign({ userId: newUser._id }, jwtSecret, {
      expiresIn: "1d",
    });

    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to register user");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1d",
      });
      return res.status(200).json(token);
    } else {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to login user");
  }
};

exports.verifyToken = async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("Not authorized");
  }
  try {
    const { userId } = jwt.verify(req.headers.authorization, jwtSecret);
    const user = await User.findOne({ _id: userId });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ msg: "Not authorized" });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Not authorized" });
  }
};