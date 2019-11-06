const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/login", controller.login);

router.post("/signup", controller.signUp);

router.get("/", auth, controller.getUser);

module.exports = router;
