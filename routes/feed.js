const { body } = require("express-validator");
const { getPosts, createPost, getPost } = require("../controllers/feed");

const router = require("express").Router();

// GET /feed/posts
router.get("/posts", getPosts);

// Create post /feed/posts
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

// GET Single post: /feed/post
router.get("/post/:postId", getPost);

router.put('/post/:postId')

module.exports = router;
