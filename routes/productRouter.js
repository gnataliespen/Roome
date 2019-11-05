const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", controller.getProducts);

router.get("/product/:id", controller.getProduct);

router.post("/create", auth, admin, controller.createProduct);

router.delete("/delete/:id", auth, admin, controller.deleteProduct);

module.exports = router;
