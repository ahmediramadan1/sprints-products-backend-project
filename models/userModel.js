const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email!"],
  },

  password: {
    type: String,
    required: [true, "You must enter a password!"],
    minlength: [8, "Password must be more than or equal to 8 characters"],
    select: false,
  },

  passwordRepeat: {
    type: String,
    required: [true, "You must confirm your password!"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match!",
    },
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordRepeat = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
