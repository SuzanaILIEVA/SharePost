const express = require("express");
const { login, register } = require("../controllers/auth.js");
const {
  getPosts,
  createPost,
  updatePost,
  deletePosts,
} = require("../controllers/post.js");

const router = express.Router();

router.get("/getPosts", getPosts);
router.post("/createPost", createPost);
router.patch("/updatePost/:id", updatePost);
router.delete("/deletePost/:id", deletePosts);

module.exports = router;
