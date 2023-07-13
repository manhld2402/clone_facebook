const express = require("express");
const {
  signup,
  login,
  changePassword,
  sendCodeForgetPassword,
  newPassword,
} = require("../Controller/auth.controll");
const {
  emailIsExist,
  emailNotIsExist,
  validateLogin,
  validateSignup,
  validateChangePassword,
  checkCodeForgetPassword,
} = require("../Middleware/auth.middleware");
const router = express.Router();

router.post("/signup", validateSignup, emailIsExist, signup);
router.post("/login", validateLogin, login);
router.post(
  "/changepassword",
  emailNotIsExist,
  validateChangePassword,
  changePassword
);
router.post("/send-code-forget", emailNotIsExist, sendCodeForgetPassword);
router.post("/new-password", checkCodeForgetPassword, newPassword);
module.exports = router;
