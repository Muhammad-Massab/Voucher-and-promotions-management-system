const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");

router.post("/apply-discount", discountController.applyDiscount);

module.exports = router;
