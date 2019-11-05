const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.get("/", auth, controller.getCart);

module.exports = router;
