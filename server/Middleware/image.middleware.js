const express = require("express");
const multer = require("multer");

// config storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `E:/Code/Learning/TS/vite/server/public/assits`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.mimetype.split("/")[file.mimetype.split("/").length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage }).single("file");

module.exports.uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err });
    } else {
      next();
    }
  });
};
