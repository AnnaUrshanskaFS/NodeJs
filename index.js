const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const port = 3000;
const users = require("./routes/users");
const chalk = require("chalk");
const log = console.log;
const error = chalk.bold.red;
const success = chalk.bold.yellow;
app.use(morgan(":method :url :status :response-time ms"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(express.static("public"));
app.use("/api/users", users);
mongoose
  .connect("mongodb://localhost:27017/rest_api")
  .then(() => log(success("Connected to MongoDB...")))
  .then(() => {
    app.listen(port, () => {
      console.info(success(`start server start listening on port ${port}`));
    });
  })
  .catch((err) => console.error(error(err)));
app.use(express.json());
