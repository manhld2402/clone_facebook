const { db } = require("../utils/database");
const mysql = require("mysql2");
const { findByProperty } = require("./general.model");
//check chặn
module.exports.checkUserActive = async (user_id_request, user_id_profile) => {
  let checkFriendShip = await db.execute(
    `SELECT * FROM tb_friendship WHERE (user_id_request =? AND user_id_answer=? AND status_relationship = 4)OR(user_id_request =? AND user_id_answer=? AND status_relationship = 4)`,
    [user_id_request, user_id_profile, user_id_profile, user_id_request]
  );
  let [result] = checkFriendShip[0];
  return result;
};

module.exports.getInforOneUser = async (user_id_request, user_id_profile) => {
  let checkIsMe =
    parseInt(user_id_request) == parseInt(user_id_profile) ? true : false;
  let result = {};
  let getUser = await findByProperty("tb_user", "user_id", user_id_profile);
  let status_relationship = await db.execute(
    `SELECT status_relationship FROM tb_friendship WHERE (user_id_request = ? AND user_id_answer=?) OR (user_id_request = ? AND user_id_answer=?)`,
    [user_id_request, user_id_profile, user_id_profile, user_id_request]
  );
  let awaitAccept = undefined;
  if (status_relationship[0][0]?.status_relationship === 1) {
    let checkAwait = await db.execute(
      `SELECT status_relationship FROM tb_friendship WHERE user_id_request = ? AND user_id_answer=?`,
      [user_id_request, user_id_profile]
    );
    if (checkAwait[0][0]) {
      awaitAccept = true;
    }
  }
  const totalFriend = await db.execute(
    `SELECT * FROM tb_friendship WHERE (user_id_request = ? OR user_id_answer=?)AND status_relationship>1`,
    [user_id_profile, user_id_profile]
  );

  result = {
    dataUser: {
      ...getUser[0],
      user_email: null,
      password: null,
      user_phone: null,
      status_relationship: status_relationship[0][0]
        ? status_relationship[0][0].status_relationship
        : 0,
      awaitAccept,
      totalFriend: totalFriend[0].length,
    },
    dataPost: [],
    dataFriends: [],
  };
  const findFriend = await db.execute(
    `SELECT u.user_id,u.user_firstName,u.user_lastName,u.user_avatar FROM tb_user as u
  JOIN tb_friendship as fs ON fs.user_id_answer = u.user_id
  WHERE fs.user_id_request =? AND fs.status_relationship =2`,
    [user_id_profile]
  );
  result.dataFriends = [...findFriend[0]];
  const totalFollow = await db.execute(
    `SELECT * FROM tb_friendship WHERE (user_id_answer=? AND status_relationship=1)`,
    [user_id_profile]
  );
  result.totalFollower = totalFollow[0].length;
  if (checkIsMe) {
    let myPost =
      await db.execute(`SELECT distinct u.user_firstName,u.user_lastName,u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time FROM tb_post AS p
    JOIN tb_user as u ON p.post_authorId = u.user_id
    WHERE p.post_authorId=${user_id_request}
    ORDER BY p.post_time DESC`);
    if (myPost[0].length > 0) {
      for (const post of myPost[0]) {
        const findCmt = await db.execute(
          `SELECT u.user_id, u.user_firstName, u.user_lastName, u.user_avatar, cmt.cmt_id, cmt.cmt_content, cmt.cmt_time FROM tb_comment AS cmt 
          JOIN tb_user AS u ON cmt.user_cmt_id = u.user_id
          WHERE cmt.cmt_post_owner_id = ?
          ORDER BY cmt.cmt_time DESC`,
          [post.post_id]
        );
        const totalAction = await db.execute(
          `SELECT action_status FROM tb_action WHERE action_post_id=?`,
          [post.post_id]
        );
        result.dataPost.push({
          post: post,
          totalAction: [...totalAction[0]],
          cmts: [...findCmt[0]],
        });
      }
    }
  } else {
    if (
      !status_relationship[0][0] ||
      status_relationship[0][0].status_relationship === 1
    ) {
      let userPost = await db.execute(
        `SELECT u.user_firstName,u.user_lastName,u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time FROM tb_post AS p
    JOIN tb_user as u ON p.post_authorId = u.user_id
    WHERE (p.post_authorId=? AND p.post_active=3)
    ORDER BY p.post_time DESC`,
        [user_id_profile]
      );
      if (userPost[0].length > 0) {
        for (const post of userPost[0]) {
          const findCmt = await db.execute(
            `SELECT u.user_id, u.user_firstName, u.user_lastName, u.user_avatar, cmt.cmt_id, cmt.cmt_content, cmt.cmt_time FROM tb_comment AS cmt 
            JOIN tb_user AS u ON cmt.user_cmt_id = u.user_id
            WHERE cmt.cmt_post_owner_id = ?
            ORDER BY cmt.cmt_time DESC`,
            [post.post_id]
          );
          const totalAction = await db.execute(
            `SELECT action_status FROM tb_action WHERE action_post_id=?`,
            [post.post_id]
          );
          result.dataPost.push({
            post: post,
            totalAction: totalAction[0],
            cmts: [...findCmt[0]],
          });
        }
      }
    } else {
      let userPost = await db.execute(
        `SELECT u.user_firstName,u.user_lastName,u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time FROM tb_post AS p
    JOIN tb_user as u ON p.post_authorId = u.user_id
    WHERE((p.post_authorId=? AND p.post_active=3)OR( p.post_authorId=? AND p.post_active=2))
    ORDER BY p.post_time DESC`,
        [user_id_profile, user_id_profile]
      );
      if (userPost[0].length > 0) {
        for (const post of userPost[0]) {
          const findCmt = await db.execute(
            `SELECT u.user_id, u.user_firstName, u.user_lastName, u.user_avatar, cmt.cmt_id, cmt.cmt_content, cmt.cmt_time FROM tb_comment AS cmt 
            JOIN tb_user AS u ON cmt.user_cmt_id = u.user_id
            WHERE cmt.cmt_post_owner_id = ?
            ORDER BY cmt.cmt_time DESC`,
            [post.post_id]
          );
          const totalAction = await db.execute(
            `SELECT action_status FROM tb_action WHERE action_post_id=?`,
            [post.post_id]
          );
          result.dataPost.push({
            post: post,
            totalAction: totalAction[0],
            cmts: [...findCmt[0]],
          });
        }
      }
    }
  }
  return result;
};

module.exports.setNewInformation = async (
  user_key,
  new_information,
  user_id
) => {
  let sql = "UPDATE tb_user SET ??=? WHERE user_id=?";
  let inserts = [user_key, new_information, user_id];
  sql = mysql.format(sql, inserts);
  await db.execute(sql);
};
module.exports.setUserPhoto = async (key, value, user_id) => {
  let findOldPhoto = await db.execute(
    `SELECT ? FROM tb_user WHERE user_id =?`,
    [key, user_id]
  );
  // return db.execute(`UPDATE tb_user SET ?=? WHERE user_id=?`, [
  //   key,
  //   value,
  //   user_id,
  // ]);
};
module.exports.setCover = (user_cover, user_id) => {
  return db.execute(`UPDATE tb_user ?=? WHERE user_id=?`, [
    user_cover,
    user_id,
  ]);
};
//tìm request friend
module.exports.getFriendRequest = async (user_id) => {
  let findFriendRequest = await db.execute(
    `SELECT u.user_id,u.user_firstName,u.user_lastName,u.user_avatar FROM tb_friendship as fs JOIN tb_user as u 
    ON fs.user_id_request=u.user_id WHERE (fs.user_id_answer=? AND fs.status_relationship = 1) LIMIT 12`,
    [user_id]
  );
  let result = findFriendRequest[0];
  return result;
};
//tìm birthday friend
module.exports.getBirthdayFriend = async (user_id) => {
  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let findBirthdayFriend = await db.execute(
    `SELECT distinct u.user_id,u.user_firstName,u.user_lastName,u.user_avatar,u.user_birthday_year
    FROM tb_friendship as fs JOIN tb_user as u 
    ON fs.user_id_request=u.user_id OR fs.user_id_answer=u.user_id
    WHERE ((fs.user_id_answer=? OR fs.user_id_request=?) AND fs.status_relationship = 2 AND u.user_birthday_month =? AND u.user_birthday_day=? )`,
    [user_id, user_id, month, day]
  );

  let result = findBirthdayFriend[0];
  return result;
};
//Yêu cầu kết bạn
module.exports.setRequestFriendShip = async (
  user_id_request,
  user_id_answer,
  time_request
) => {
  return await db.execute(
    `INSERT INTO tb_friendship( user_id_request, user_id_answer,request_time) VALUE(?,?,?)`,
    [user_id_request, user_id_answer, time_request]
  );
};
//Đồng ý kết bạn
module.exports.setFriendShip = (time, user_id_request, user_id_answer) => {
  return db.execute(
    `UPDATE tb_friendship SET status_relationship = 2, answer_time=? WHERE user_id_request=? AND user_id_answer=?`,
    [time, user_id_request, user_id_answer]
  );
};
//Xoa ket ban
module.exports.deleteFriendShip = (user_id_answer, user_id_request) => {
  return db.execute(
    `DELETE FROM tb_friendship WHERE user_id_request=? AND user_id_answer=?`,
    [user_id_request, user_id_answer]
  );
};
