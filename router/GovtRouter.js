const express = require("express")
const router = express.Router()




const {addGovt} = require("../controller/GovtController")

router.post("/govt", addGovt)
// router.get("/usman", getGovt)

module.exports = router
