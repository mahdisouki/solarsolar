const express = require("express");
const { createBlog, getBlogs, getBlogById , deleteBlog } = require("../controllers/BlogCtrl");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../middlewares/multer");
// router.post('/', protect, upload.array('images', 5), createBlog);
router.post("/", upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]), createBlog);
  
router.get("/", getBlogs);

router.get("/:id", getBlogById); 
router.delete("/:id", deleteBlog);


module.exports = router;
