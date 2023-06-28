const express = require("express");
const { checkToken } = require("../Middleware/auth.middleware");
const { getDataClient } = require("../Controller/user.controll");
const router = express.Router();

router.get("/", checkToken, getDataClient);

module.exports = router;
