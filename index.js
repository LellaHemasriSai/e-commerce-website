// creating a server

const express = require("express");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

app.use("/", (req, res) => {
  res.send("Hello from server side");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
