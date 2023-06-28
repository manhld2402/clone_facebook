const { db } = require("../utils/database");
const mysql = require("mysql2");
module.exports.getDataMain = async (req, res) => {
  const { authorization } = req.headers;
  console.log("authen--------------", authorization);
  let dataFriend = await db.execute(
    `SELECT u.user_avatar,u.user_firstName,u.user_lastName,p.post_id,p.post_authorId,p.post_content,p.post_time,p.post_urlPicture FROM tb_friendship as fs JOIN tb_user as u ON fs.user_id_request = u.user_id JOIN tb_post as p ON fs.user_id_request = p.post_authorId JOIN tb_comment as c ON c.cmt_post_owner_id = p.post_id 
    WHERE fs.user_id_request = ? OR (fs.user_id_answer=? AND status_relationship>1)
    ORDER BY rand(),p.post_time ASC `,
    [authorization, authorization]
  );
  console.log(dataFriend[0]);
  res.status(200).json({ message: dataFriend[0] });
};
