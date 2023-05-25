const router = require("express").Router();

// user controller
const { register, login } = require("../controllers/UserController");
const {
  createPost,
  singlePost,
  deletePost,
  myPostList,
  updatePost,
  postList,
} = require("../controllers/PostController");

// authverify middleware
const authVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

// user router
router.post("/user/registration", register);
router.post("/user/login", login);

// post router
router.post("/posts/create", authVerifyMiddleware, createPost);
router.get("/posts/:id", authVerifyMiddleware, singlePost);
router.get("/posts/my", authVerifyMiddleware, myPostList);
router.get("/posts", postList);
router.delete("/posts/delete/:id", authVerifyMiddleware, deletePost);
router.put("/posts/update/:id", authVerifyMiddleware, updatePost);

module.exports = router;
