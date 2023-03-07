// creating a server

const express = require("express");
const dbConnect = require("./config/dbConnector");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

dbConnect();

app.use("/", (req, res) => {
  res.send("Hello from server side");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
