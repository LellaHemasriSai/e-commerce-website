const express = require("express");
const {
  createbrand,
  updatebrand,
  deletebrand,
  getbrand,
  getAllbrand,
} = require("../controller/brandControl");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, isAdmin, createbrand);
router.put("/:id", authentication, isAdmin, updatebrand);
router.delete("/:id", authentication, isAdmin, deletebrand);
router.get("/:id", getbrand);
router.get("/", getAllbrand);

module.exports = router;
