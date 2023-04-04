// creating a server

const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const dbConnect = require("./config/dbConnector");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const authenticationRouter = require("./routes/authenticationRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/productcategoryRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const couponRouter = require("./routes/couponRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

const cors = require("cors");

dbConnect();

// app.use("/", (req, res) => {
//   res.send("Hello from server side");
// });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "HEAD", "OPTIONS"],
  })
);
app.use("/api/user", authenticationRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/coupon", couponRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
