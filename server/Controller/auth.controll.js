const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  insertAuth,
  findUser,
  setPassword,
  insertForgetPassword,
} = require("../Models/auth.model");
const { findByProperty, deleteByProperty } = require("../Models/general.model");
const nodeMailer = require("nodemailer");
module.exports.signup = async (req, res) => {
  const {
    user_firstName,
    user_lastName,
    user_email,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth,
    password,
    user_gender,
  } = req.body;
  console.log("signup-------", req.body);
  let user_avatar =
    user_gender === 1
      ? "http://localhost:8000/male.jpg"
      : "http://localhost:8000/female.jpg";
  let user_id = Math.floor(Math.random() * 100000);
  let salt = bcrypt.genSaltSync(10);
  let hashPassword = bcrypt.hashSync(password, salt);
  try {
    insertAuth(
      user_id,
      user_firstName,
      user_lastName,
      user_email,
      yearOfBirth,
      monthOfBirth,
      dayOfBirth,
      hashPassword,
      user_gender,
      user_avatar
    ).then(() => res.status(201).json({ status: "successfully" }));
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports.login = async (req, res) => {
  let { account, password } = req.body;

  try {
    let findPassword = await findUser(account);
    let findDataUser = await findByProperty(
      "tb_user",
      "password",
      findPassword.password
    );
    let checkPassword = bcrypt.compareSync(password, findPassword.password);

    if (checkPassword) {
      let accessToken = jwt.sign(
        { user_id: findDataUser[0].user_id },
        "ManhTH2402"
      );
      res.status(200).json({
        status: "successfully",
        accessToken,
        user_id: findDataUser[0].user_id,
      });
    } else {
      res.status(300).json({
        status: "fail",
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.sendCodeForgetPassword = async (req, res) => {
  // mailer.sendMail(req.query.email, "hihi", "haha");
  let { user_email } = req.body;
  let indexForget = Math.floor(Math.random() * 100000);
  let forgetCode = Math.floor(Math.random() * 100000).toString();
  let saltRound = 10;
  let salt = bcrypt.genSaltSync(saltRound);
  let salt1 = bcrypt.genSaltSync(saltRound);
  let hashForgetCode = bcrypt.hashSync(forgetCode, salt);
  let hashUserEmail = bcrypt.hashSync(user_email, salt1);
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "manh.ld2402@gmail.com",
        pass: "tpoqhpyqmhufoscl",
      },
    });
    const mailOptions = {
      from: "manh.ld2402@gmail.com",
      to: user_email,
      subject: "FACEBOOK",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>test</title>
      </head>
      <body>
      <h1>Có ai đó đang cố gắng thay đổi mật khẩu của bạn</h1>
      <p>Nếu đúng là bạn hãy click vào  
      <a href="http://localhost:5173/forget-password/${indexForget}?forgetcode=${hashForgetCode}&user_email=${user_email}">Đây</a> để thay đổi mật khẩu. Có hiệu lực trong 3 phút
      </p>
      </body>
      </html>`,
    };
    const result = await transporter.sendMail(mailOptions);

    await insertForgetPassword(indexForget, hashUserEmail, forgetCode);
    setTimeout(() => {
      deleteByProperty("tb_forget_password", "index", indexForget);
    }, 6000000);
    res.status(200).json({
      status: "successfully",
      message:
        "Tin nhắn đã được gửi đến Email. Nếu không thấy hãy tìm trong thư mục spam!!!",
    });
  } catch (error) {
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};
module.exports.newPassword = async (req, res) => {
  let { password } = req.body;
  let { user_email, index } = req.query;

  try {
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = bcrypt.hashSync(password, salt);
    await setPassword(hashPassword, user_email);
    await deleteByProperty("tb_forget_password", "index", index);
    res.status(201).json({
      status: "successfully",
      message: "Tạo mới mật khẩu thành công!!!",
    });
  } catch (error) {}
};
module.exports.changePassword = async (req, res) => {
  let { user_email, oldPassword, newPassword } = req.body;
  let findPassword = await findUser(user_email);
  try {
    let checkPassword = bcrypt.compareSync(oldPassword, findPassword.password);
    if (checkPassword) {
      let salt = bcrypt.genSaltSync(10);
      let hashPassword = bcrypt.hashSync(newPassword, salt);
      setPassword(hashPassword, user_email).then(() => {
        res.status(201).json({
          status: "successfully",
          message: "Đổi mật khẩu thành công!!",
        });
      });
    } else {
      res.status(300).json({
        status: "fail",
        message: "Mật khẩu không chính xác",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
