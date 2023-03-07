const user = require("../schemas/userSchema");

const createUser = async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });

  if (!findUser) {
    const newUser = await user.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      msg: "User already exists!!",
      success: false,
    });
  }
};

module.exports = { createUser };
