const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/login", controller.login);

router.post("/signup", controller.signUp);

router.get("/", controller.verifyToken);

module.exports = router;
