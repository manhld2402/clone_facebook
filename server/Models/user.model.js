const { db } = require("../utils/database");
const mysql = require("mysql2");
// module.exports.getDataClient=async(user_id)=>{
//   const data = await scrollBy.execute(``)

// }
module.exports.getInforOneUser= async()=>{
  let getUser= db.execute(``)
}
module.exports.setInfor = (
  user_firstName,
  user_lastName,
  user_about,
  user_id
) => {
  return db.execute(
    `UPDATE tb_user SET user_firstName=?,user_lastName=?,user_about=? WHERE user_id=?`,
    [user_firstName, user_lastName, user_about, user_id]
  );
};
module.exports.setAvatar = (user_avatar, user_id) => {
  return db.execute(`UPDATE tb_user SET user_avatar=? WHERE user_id=?`, [
    user_avatar,
    user_id,
  ]);
};
module.exports.setCover = (user_cover, user_id) => {
  return db.execute(`UPDATE tb_user SET user_cover=? WHERE user_id=?`, [
    user_cover,
    user_id,
  ]);
};
