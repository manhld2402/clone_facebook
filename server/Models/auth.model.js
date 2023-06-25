const mysql = require("mysql2");
const { db } = require("../utils/database");

module.exports.insertAuth = (
  user_id,
  user_firstName,
  user_lastName,
  user_email,
  yearOfBirth,
  monthOfBirth,
  dayOfBirth,
  password,
  user_gender,
  user_avatar
) => {
  return db.execute(
    `INSERT INTO tb_user(user_id,user_firstName,user_lastName,user_email,user_birthday_year,user_birthday_month,user_birthday_day,password,user_gender,user_avatar) VALUE(?,?,?,?,?,?,?,?,?,?)`,
    [
      user_id,
      user_firstName,
      user_lastName,
      user_email,
      yearOfBirth,
      monthOfBirth,
      dayOfBirth,
      password,
      user_gender,
      user_avatar
    ]
  );
};
module.exports.findUser = async (inputLogin) => {
  const find = await db.execute(
    `SELECT password FROM tb_user WHERE user_phone=? OR user_email=? OR user_id=?`,
    [inputLogin, inputLogin, inputLogin]
  );
  let [result] = find[0];
  return result;
};
module.exports.setPassword = (password, user_email) => {
  return db.execute(`UPDATE tb_user SET password=? WHERE user_email=?`, [
    password,
    user_email,
  ]);
};
module.exports.insertForgetPassword = (index, user_email, code) => {
  return db.execute(`INSERT INTO tb_forget_password VALUE (?, ?, ?)`, [
    index,
    user_email,
    code,
  ]);
};
