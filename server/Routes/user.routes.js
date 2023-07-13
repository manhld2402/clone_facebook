const express = require("express");
const router = express.Router();
const { checkToken } = require("../Middleware/auth.middleware");
const {
  getDataClient,
  getDataOneUser,
  getUserRequest,
  getUserBirthday,
  acceptRequest,
  createRequest,
  cancelRequest,
  rejectRequest,
  updateInformation,
  updateUserPhoto,
} = require("../Controller/user.controll");
const { checkUserExist } = require("../Middleware/user.middleware");
const { uploadFile } = require("../Middleware/image.middleware");

router.get("/", checkToken, getDataClient);
router.get("/profile/:id", checkToken, checkUserExist, getDataOneUser);
router.get("/friends/request", checkToken, getUserRequest);
router.get("/friends/birthday", checkToken, getUserBirthday);
router.get("/friends/accept/:id", checkToken, acceptRequest);
router.delete("/friends/delete/:id", checkToken, cancelRequest);
router.delete("/friends/reject/:id", checkToken, rejectRequest);
router.post("/friends/request", checkToken, createRequest);
router.post("/update/information", checkToken, updateInformation);
router.put("/update/photo",checkToken,uploadFile,updateUserPhoto)
module.exports = router;

