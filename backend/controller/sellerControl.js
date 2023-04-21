const user = require("../schemas/userSchema");
const asyncHandler = require("express-async-handler");

const createSeller = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    const newUser = await user.create(req.body);
    const updateuser = await user.findByIdAndUpdate(
      newUser._id,
      {
        role: "admin",
      },
      {
        new: true,
      }
    );
    res.json(updateuser);
  } else {
    throw new Error("Seller already exists!!");
  }
});

module.exports = createSeller;
