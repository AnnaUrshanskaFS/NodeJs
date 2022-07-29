const express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  app = express(),
  port = 3900,
  users = require("./routes/users"),
  chalk = require("chalk"),
  log = console.log,
  error = chalk.bold.red,
  success = chalk.bold.yellow,
  auth = require("./routes/auth"),
  cors = require("cors");
mongoose
  .connect("mongodb://localhost:27017/rest_api")
  .then(() => log(success("Connected to MongoDB...")))
  .catch((err) => console.error(error(err)));

app.use(morgan(":method :url :status :response-time ms"));

app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(port, () => {
  console.info(success(`start server start listening on port ${port}`));
});
