const { json } = require("body-parser");
const { findUser, setPassword } = require("../Models/auth.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { findByProperty } = require("../Models/general.model");
const jwt = require("jsonwebtoken");
module.exports.validateLogin = (req, res, next) => {
  let { account, password } = req.body;

  if (!account || !password) {
    res
      .status(300)
      .json({ status: "fail", message: "Nhập đầy đủ thông tin!!" });
  } else {
    next();
  }
};
module.exports.validateSignup = (req, res, next) => {
  let {
    user_firstName,
    user_lastName,
    user_email,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth,
    password,
    user_gender,
  } = req.body;

  const schema = Joi.object({
    user_email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    yearOfBirth: Joi.string().pattern(new RegExp("^[0-9]{4}$")),
    monthOfBirth: Joi.string().pattern(new RegExp("^[0-9]{1,2}$")),
    dayOfBirth: Joi.string().pattern(new RegExp("^[0-9]{1,2}$")),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    user_gender: Joi.string().pattern(new RegExp("^[0-9]{1,1}$")),
  });
  let value = schema.validate({
    user_email,
    password,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth,
    user_gender,
  });
  if (!value.error) {
    next();
  } else {
    res
      .status(500)
      .json({ status: "fail", message: value.error.details[0].message });
  }
};

module.exports.emailIsExist = async (req, res, next) => {
  const { user_email } = req.body;
  try {
    let user = await findUser(user_email);
    if (user) {
      res.status(400).json({
        status: "fail",
        message: "Account đã tồn tại!!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.emailNotIsExist = async (req, res, next) => {
  const { user_email } = req.body;
  try {
    let user = await findUser(user_email);
    if (!user) {
      res
        .status(404)
        .json({ status: "fail", message: "Email không tồn tại!!" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.validateChangePassword = async (req, res, next) => {
  let { user_email, oldPassword, newPassword } = req.body;
  try {
    const schema = Joi.object({
      user_email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      oldPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")),
      newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,12}$")),
    });
    let value = schema.validate({
      user_email,
      oldPassword,
      newPassword,
    });
    if (!value.error) {
      next();
    } else {
      res
        .status(500)
        .json({ status: "fail", message: value.error.details[0].message });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.checkCodeForgetPassword = async (req, res, next) => {
  let { user_email, forgetcode, index } = req.query;
  try {
    let find = await findByProperty("tb_forget_password", "index", index);
    if (find[0]) {
      let checkCode = bcrypt.compareSync(find[0].code, forgetcode);
      let checkEmail = bcrypt.compareSync(
        user_email,
        find[0].user_email_forget
      );
      if (checkCode && checkEmail) {
        next();
      } else {
        res.status(300).json({
          status: "fail",
          message: "Vui lòng kiểm tra lại đường dẫn!!!",
        });
      }
    } else {
      res
        .status(300)
        .json({ status: "fail", message: "Vui lòng kiểm tra lại đường dẫn" });
    }
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
// module.exports.checkToken = (req, res, next) => {
//   let { authentication } = req.headers;
//   console.log("authen-----------", authentication);
//   let checkToken = jwt.verify(authentication, "ManhTH2402", (err, decoded) => {
//     if (err) {
//       // Xử lý lỗi xác minh JWT
//       console.error("Error verifying JWT:", err);
//     } else {
//       // Truy cập vào payload của JWT
//       const payload = decoded;
//       req.authorization = payload.user_id;
//     }
//   });
//   console.log("checkToken", checkToken);

//   if (checkToken) {
//     next();
//   } else {
//     res.status(404).json({ status: "fail", message: "Please Login" });
//   }
// };

module.exports.checkToken = (req, res, next) => {
  let { authentication } = req.headers;
  console.log("authen-----------", authentication);
  try {
    const decoded = jwt.verify(authentication, "ManhTH2402");
    const payload = decoded;
    req.headers.authorization = payload.user_id;
    next();
  } catch (err) {
    console.error("Error verifying JWT:", err);
    res.status(404).json({ status: "fail", message: "Please Login" });
  }
};
