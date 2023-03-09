const user = require("../schemas/userSchema");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generaterefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");

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

module.exports = {
  createUser,
  loginControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  handleRefreshToken,
};
