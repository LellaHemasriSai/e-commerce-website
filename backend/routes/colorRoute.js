const express = require("express");
const {
  createcolor,
  updatecolor,
  deletecolor,
  getcolor,
  getAllcolor,
} = require("../controller/colorControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, createcolor);
router.put("/:id", authentication, isAdmin, updatecolor);
router.delete("/:id", authentication, isAdmin, deletecolor);
router.get("/:id", getcolor);
router.get("/", getAllcolor);

module.exports = router;
