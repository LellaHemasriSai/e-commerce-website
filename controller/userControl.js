const user = require("../schemas/userSchema");
const asyncHandler = require("express-async-handler");

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
    res.json(findUser);
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginControl };
