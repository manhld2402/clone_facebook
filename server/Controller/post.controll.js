const {
  insertPost,
  getNewfeed,
  insertAction,
  deleteAction,
  insertComment,
} = require("../Models/post.model");

module.exports.uploadPost = async (req, res) => {
  const { authorization } = req.headers;
  try {
    let date = new Date();
    let postContent = JSON.parse(req.body.postContent);
    let postActive = JSON.parse(req.body.postActive);
    let path = req.file
      ? `http://localhost:8000/assits/${req.file.filename}`
      : "";

    insertPost(authorization, postActive, postContent, path, date);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
//Newfeed
module.exports.loadNewfeed = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let newFeed = await getNewfeed(authorization);
    res.status(200).json({ newFeed });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.actionPost = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { post_id, action } = req.query;
    console.log(req.query);
    let totalAction = await insertAction(authorization, post_id, action);
    res.status(201).json({
      status: "successfuly",
      message: `${action} succsess`,
      totalAction,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.cancelActionPost = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { post_id } = req.query;
    console.log("post_id-----------", post_id);
    let totalAction = await deleteAction(post_id, authorization);
    res.status(201).json({
      status: "successfuly",
      message: "Cancel action success",
      totalAction,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
module.exports.createComment = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { commentContent, post_id } = req.body;
    let cmtId = await insertComment(post_id, authorization, commentContent);
    console.log("cmtId", cmtId);
    res.status(201).json({ status: "successfuly", cmt_id: cmtId });
  } catch (error) {
    res.status(500).json({ error });
  }
};
