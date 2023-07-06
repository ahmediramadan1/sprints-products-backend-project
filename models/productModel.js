const mongoose = require("mongoose");

const Category = require("./categoryModel");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
    trim: true,
    minlength: [3, "A product name must have more or equal to 3 characters"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  category_id: {
    type: String,
    minlength: [1, "Category ID must be more than or equal to 1 characters"],
    required: [true, "A product must have a category ID"],
    validate: {
      validator: async function (value) {
        const category = await Category.findById(value);
        return category ? true : false;
      },
      message: "Category with this ID does not exist!",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
