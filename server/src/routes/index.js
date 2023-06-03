const router = require("express").Router();

const {
  register,
  login,
  updateProfile,
  profileDetails,
  RecoverVerifyEmail,
  RecoverVerifyOTP,
  RecoverResetPass,
} = require("../controllers/UserController");

const authVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

// user router
router.post("/user/registration", register);
router.post("/user/login", login);
router.post("/user/update", authVerifyMiddleware, updateProfile);
router.get("/user/profileDetails", authVerifyMiddleware, profileDetails);

module.exports = router;
