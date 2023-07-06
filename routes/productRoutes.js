const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(authController.protectRoute, productController.createProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(authController.protectRoute, productController.updateProduct)
  .delete(authController.protectRoute, productController.deleteProduct);

module.exports = router;
