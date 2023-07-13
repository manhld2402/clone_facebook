const { checkUserActive } = require("../Models/user.model");

module.exports.checkUserExist = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const findUser = await checkUserActive(authorization, id);
  if (findUser) {
    res.status(400).json({
      status: "fail",
      message: "Chặn nhau rồi",
    });
  } else {
    next();
  }
};
