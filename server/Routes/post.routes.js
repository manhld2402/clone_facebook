const express = require("express");
const { checkToken } = require("../Middleware/auth.middleware");
const { uploadFile } = require("../Middleware/image.middleware");
const {
  uploadPost,
  loadNewfeed,
  actionPost,
  cancelActionPost,
  createComment,
} = require("../Controller/post.controll");
const router = express.Router();
router.post("/upload", checkToken, uploadFile, uploadPost);
router.get("/", checkToken, loadNewfeed);
router.get("/action", checkToken, actionPost);
router.delete("/action", checkToken, cancelActionPost);
router.post("/comment", checkToken, createComment);
module.exports = router;
