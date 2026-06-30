const express = require("express");

const router = express.Router();

const { sendContact } = require("../controller/ContactController");

router.post("/contact", sendContact);

module.exports = router;