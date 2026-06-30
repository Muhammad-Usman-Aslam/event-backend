const express = require("express");
const router = express.Router();
const formdible = require("express-formidable");

const { blogAddData,
 blogGetData,
  blogGetPhoto,
  getSingleBlog,  searchBlogs} = require("../controller/blogController");

router.post('/blog', formdible(),blogAddData);
router.get('/getblog',blogGetData)
router.get('/img/:id',blogGetPhoto)
router.get("/getblog/:id", getSingleBlog);
router.get("/search", searchBlogs);

module.exports = router;
