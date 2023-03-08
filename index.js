// creating a server

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const dbConnect = require("./config/dbConnector");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authenticationRuter = require("./routes/authenticationRoute");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

dbConnect();

// app.use("/", (req, res) => {
//   res.send("Hello from server side");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authenticationRuter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
