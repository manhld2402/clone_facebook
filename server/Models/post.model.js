const express = require("express");
const { db } = require("../utils/database");
module.exports.insertPost = (
  post_authorId,
  post_active,
  post_content,
  post_urlPicture,
  post_time
) => {
  db.execute(
    `INSERT INTO tb_post(
    post_authorId,
    post_active,
    post_content,
    post_urlPicture,
    post_time) VALUE(?,?,?,?,?)`,
    [post_authorId, post_active, post_content, post_urlPicture, post_time]
  );
};
module.exports.getNewfeed = async (client_id) => {
  let result = [];
  let requestFriendPost = await db.execute(
    `SELECT u.user_firstName, u.user_lastName, u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time
    FROM tb_post AS p
    JOIN tb_user AS u ON p.post_authorId = u.user_id
    JOIN tb_friendship AS fs ON p.post_authorId = fs.user_id_answer
    WHERE fs.user_id_request = ? AND p.post_active=3
    ORDER BY p.post_time DESC LIMIT 10`,
    [client_id]
  );
  let friendPost1 = await db.execute(
    `SELECT u.user_firstName, u.user_lastName, u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time
  FROM tb_post AS p
  JOIN tb_user AS u ON p.post_authorId = u.user_id 
  JOIN tb_friendship AS fs ON p.post_authorId = fs.user_id_answer 
  WHERE (fs.user_id_request = ? ) AND p.post_active = 2 AND fs.status_relationship =2
  ORDER BY p.post_time DESC LIMIT 10`,
    [client_id]
  );
  let friendPost2 = await db.execute(
    `SELECT u.user_firstName, u.user_lastName, u.user_avatar, p.post_id, p.post_authorId, p.post_active, p.post_content, p.post_urlPicture, p.post_time
  FROM tb_post AS p
  JOIN tb_user AS u ON p.post_authorId = u.user_id 
  JOIN tb_friendship AS fs ON p.post_authorId = fs.user_id_request 
  WHERE (fs.user_id_answer = ? ) AND p.post_active = 2 AND fs.status_relationship =2
  ORDER BY p.post_time DESC LIMIT 10`,
    [client_id]
  );
  let totalPost = [
    ...requestFriendPost[0],
    ...friendPost1[0],
    ...friendPost2[0],
  ];
  totalPost.sort((a, b) => b.post_id - a.post_id);
  let posts = [
    ...totalPost.slice(0, 4),
    ...totalPost.slice(4, 16).sort(() => 0.5 - Math.random()),
  ];
  for (const post of posts) {
    const findCmt = await db.execute(
      `SELECT u.user_id, u.user_firstName, u.user_lastName, u.user_avatar, cmt.cmt_id, cmt.cmt_content, cmt.cmt_time FROM tb_comment AS cmt 
      JOIN tb_user AS u ON cmt.user_cmt_id = u.user_id
      WHERE cmt.cmt_post_owner_id = ?
      ORDER BY cmt.cmt_time DESC`,
      [post.post_id]
    );
    const findClientAction = await db.execute(
      `SELECT action_status FROM tb_action WHERE action_user_id=? AND action_post_id=?`,
      [client_id, post.post_id]
    );
    const totalAction = await db.execute(
      `SELECT action_status FROM tb_action WHERE action_post_id=?`,
      [post.post_id]
    );
    result.push({
      post: { ...post },
      totalAction: totalAction[0],
      clientAction: findClientAction[0][0],
      cmts: [...findCmt[0]],
    });
  }
  return result;
};
//create action
module.exports.insertAction = async (
  action_user_id,
  action_post_id,
  action_status
) => {
  let findAction = await db.execute(
    `SELECT * FROM tb_action WHERE action_user_id=? AND action_post_id=?`,
    [action_user_id, action_post_id]
  );
  if (findAction[0].length == 0) {
    await db.execute(
      `INSERT INTO tb_action (action_user_id,action_post_id,action_status) VALUE (?,?,?)`,
      [action_user_id, action_post_id, action_status]
    );
  } else {
    await db.execute(
      `UPDATE tb_action SET action_status=? WHERE action_user_id=? AND action_post_id=?`,
      [action_status, action_user_id, action_post_id]
    );
  }
  const totalAction = await db.execute(
    `SELECT action_status FROM tb_action WHERE action_post_id=?`,
    [action_post_id]
  );
 
  return totalAction[0];
};
module.exports.deleteAction = async (action_post_id, action_user_id) => {
  await db.execute(
    `DELETE FROM tb_action WHERE (action_post_id=? AND action_user_id=?)`,
    [action_post_id, action_user_id]
  );
  const totalAction = await db.execute(
    `SELECT action_status FROM tb_action WHERE action_post_id=?`,
    [action_post_id]
  );
 
  return totalAction[0];
};
module.exports.insertComment = async (
  cmt_post_owner_id,
  user_cmt_id,
  cmt_content
) => {
  let now = new Date();
  await db.execute(
    `INSERT INTO tb_comment(cmt_post_owner_id,user_cmt_id,cmt_content,cmt_time) VALUE(?,?,?,?)`,
    [cmt_post_owner_id, user_cmt_id, cmt_content, now]
  );
  let cmtId = await db.execute(
    `SELECT cmt_id FROM tb_comment WHERE cmt_post_owner_id=? AND user_cmt_id=? ORDER BY cmt_id DESC`,
    [cmt_post_owner_id, user_cmt_id]
  );
  return cmtId[0][0].cmt_id;
};
