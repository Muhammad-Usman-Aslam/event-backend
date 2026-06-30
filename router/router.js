const express = require("express")
const formdible = require("express-formidable")

const router = express.Router()
const {mobileAddData, mobileGetData,mobilePhoto} = require("../controller/controller")

router.post('/save', formdible(),mobileAddData)
router.get('/usman',mobileGetData)
router.get('/img/:id',mobilePhoto)

module.exports = router;