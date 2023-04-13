// creating a server

const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnector");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;

const authenticationRouter = require("./routes/authenticationRoute");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/productcategoryRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const cors = require("cors");

dbConnect();

// app.use("/", (req, res) => {
//   res.send("Hello from server side");
// });

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authenticationRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/color", colorRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
