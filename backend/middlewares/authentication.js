// checking if user is admin

const user = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authentication = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user1 = await user.findById(decoded?.id);
        req.user1 = user1;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized. Login again!");
    }
  } else {
    throw new Error("No token attached to header");
  }
});

module.exports = { authentication };
