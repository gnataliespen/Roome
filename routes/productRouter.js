const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);

router.get("/product/:id", controller.getProduct);

router.post("/create", controller.createProduct);

router.delete("/delete/:id", controller.deleteProduct);

module.exports = router;
