const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A category must have a name"],
    unique: true,
    trim: true,
    minlength: [3, "A category name must have more or equal to 3 characters"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
