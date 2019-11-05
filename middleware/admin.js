const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    //Get User
    let user = await User.findById(req.user);
    //Check admin
    if (user.role === "admin") {
      next();
    } else {
      return res.status(401).json({ msg: "Not authorized" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
