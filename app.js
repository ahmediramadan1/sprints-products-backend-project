const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/users/", userRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/products/", productRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
