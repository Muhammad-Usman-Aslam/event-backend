const express = require("express");
const router = express.Router();

const {subscribe,} = require("../controller/subscriberController");

router.post("/subscriber", subscribe);

module.exports = router;