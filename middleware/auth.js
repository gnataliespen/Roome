const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");
module.exports = (req, res, next) => {
  //Get token
  const token = req.header("x-auth-token");
  //Check for token
  if (!token) {
    return res.status(401).json({ msg: "Not authorized" });
  }
  //Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
