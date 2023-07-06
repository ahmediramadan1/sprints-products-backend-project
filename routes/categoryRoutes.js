const express = require("express");

const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(authController.protectRoute, categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(authController.protectRoute, categoryController.updateCategory)
  .delete(authController.protectRoute, categoryController.deleteCategory);

module.exports = router;
