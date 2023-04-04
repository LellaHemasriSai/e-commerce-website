const user = require("../schemas/userSchema");
const product = require("../schemas/productSchema");
const Cart = require("../schemas/cartSchema");
const Coupon = require("../schemas/couponSchema");
const order = require("../schemas/orderSchema");

const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generaterefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailControl");
const crypto = require("crypto");
const uniqid = require("uniqid");
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    const newUser = await user.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exists!!");
  }
});

const loginControl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const findUser = await user.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generaterefreshToken(findUser?._id);
    const updateuser = await user.findOneAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  const findAdmin = await user.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generaterefreshToken(findAdmin?._id);
    const updateuser = await user.findOneAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 100,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await user.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getaUser = await user.findById(id);
    res.json(getaUser);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const delaUser = await user.findByIdAndDelete(id);
    res.json(delaUser);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAUser = asyncHandler(async (req, res) => {
  // console.log(req.user1);
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    const updaUser = await user.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updaUser);
  } catch (error) {
    throw new Error(error);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) {
    throw new Error("No refresh Token");
  }
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user1 = await user.findOne({
    refreshToken,
  });
  if (!user1) {
    throw new Error("No refresh Token");
  }
  // res.json(user1);
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user1.id !== decoded.id) {
      throw new Error("there is something wrong with the refresh token");
    }
    const accessToken = generateToken(user1?._id);
    res.json({ accessToken });
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  // console.log(cookie);
  if (!cookie?.refreshToken) {
    throw new Error("No refresh Token");
  }
  const refreshToken = cookie.refreshToken;
  // console.log(refreshToken);
  const user1 = await user.findOne({
    refreshToken,
  });
  if (!user1) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await user.findOneAndUpdate("refreshToken", {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  const { password } = req.body;
  validateMongodbId(_id);
  const user2 = await user.findById(_id);
  if (password) {
    user2.password = password;
    const updatedPassword = await user2.save();
    res.json(updatedPassword);
  } else {
    res.json(user2);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user2 = await user.findOne({ email });
  if (!user2) {
    throw new Error("User not found with this email");
  }
  try {
    const token = await user2.createPasswordResetToken();
    await user2.save();
    const resetURL = `Follow this link to reset your password which is valid for 10 minutes. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
    const data = {
      to: email,
      text: "Hey user",
      subject: "Forgot password link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user2 = await user.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user2) throw new Error("Token expires. Try again Later");
  user2.password = password;
  user2.passwordResetToken = undefined;
  user2.passwordResetExpires = undefined;
  await user2.save();
  res.json(user2);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  try {
    const findUser = await user.findById(_id);
    res.json(findUser);
  } catch (error) {
    throw new Error();
  }
});

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    const addr = await user.findByIdAndUpdate(
      _id,
      { address: req?.body?.address },
      { new: true }
    );
    res.json(addr);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user1;
  validateMongodbId(_id);
  const user2 = await user.findById(_id);
  try {
    let products = [];

    const alreadyexists = await Cart.findOne({ orderby: user2._id });
    if (alreadyexists) {
      alreadyexists.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user2?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    const user2 = await user.findOne({ _id });
    const cart = await Cart.findOneAndRemove({ orderby: user2._id });
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user1;
  validateMongodbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  const user2 = await user.findOne({ _id });
  let { cartTotal } = await Cart.findOne({
    orderby: user2._id,
  }).populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { orderby: user2._id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
  const { cod, couponapplied } = req.body;
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    if (!cod) {
      throw new Error("COD failed");
    }
    const user2 = await user.findById(_id);
    let userCart = await Cart.findOne({ orderby: user2._id });
    let finalAmount = 0;
    if (couponapplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount * 100;
    } else {
      finalAmount = userCart.cartTotal * 100;
    }
    let newOrder = await new order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "rupees",
      },
      orderby: user2._id,
      orderstatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: item.count, sold: +item.count } },
        },
      };
    });
    const updated = await product.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user1;
  validateMongodbId(_id);
  try {
    const userOrders = await order
      .findOne({ orderby: _id })
      .populate("products.product")
      .exec();
    res.json(userOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateorder = await order.findByIdAndUpdate(
      id,
      { orderstatus: status, paymentIntent: { status: status } },
      { new: true }
    );
    res.json(updateorder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
};
