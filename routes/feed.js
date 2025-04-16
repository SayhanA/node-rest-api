const { body } = require("express-validator");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

const router = require("express").Router();

// GET /feed/posts
router.get("/posts", isAuth, getPosts);

// Create post /feed/posts
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  createPost
);

// Get post: /feed/post
router.get("/post/:postId", isAuth, getPost);

// Update post   /feed/post/:postId
router.put(
  "/post/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  updatePost
);

// Delete post: /feed/post
router.delete("/post/:postId", isAuth, deletePost);

module.exports = router;
