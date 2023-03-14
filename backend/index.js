// creating a server

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const dbConnect = require("./config/dbConnector");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authenticationRouter = require("./routes/authenticationRoute");
const productRouter = require("./routes/productRoute");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

dbConnect();

// app.use("/", (req, res) => {
//   res.send("Hello from server side");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/user", authenticationRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
