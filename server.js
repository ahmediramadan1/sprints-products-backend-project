const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({path: "./.env"});

const Database = process.env.DATABASE.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(Database).then(() => {
  console.log("Database successfully connected!");
});

const app = require("./app");

console.log(app.get("env"));

const server = app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
