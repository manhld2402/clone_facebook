const { findByProperty } = require("../Models/general.model");
const {
  getInforOneUser,
  getFriendRequest,
  getBirthdayFriend,
  setFriendShip,
  deleteFriendShip,
  setRequestFriendShip,
  setNewInformation,
  setUserPhoto,
} = require("../Models/user.model");
//lấy data người dùng
module.exports.getDataClient = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let getData = await findByProperty("tb_user", "user_id", authorization);
    if (getData[0]) {
      res.status(200).json({
        status: "Lấy dữ liệu thành công",
        data: { ...getData[0], password: null, user_email: null },
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
//update About
module.exports.updateInformation = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { newValue } = req.body;
    let { key } = req.query;
    console.log(key);
    await setNewInformation(key, newValue, authorization);
    res.status(201).json({ status: "successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
//lấy data profile
module.exports.getDataOneUser = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { id } = req.params;
    let findData = await getInforOneUser(authorization, id);
    let checkIsMe = parseInt(id) == authorization ? "My Profile" : undefined;
    res
      .status(200)
      .json({ data: findData, message: "Get successfuly", checkIsMe });
  } catch (error) {
    console.log("err---------", error);
  }
};
//tìm request friend
module.exports.getUserRequest = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let data = await getFriendRequest(authorization);
    res.status(200).json({ message: "successfuly", data });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//tìm birthday friend
module.exports.getUserBirthday = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let data = await getBirthdayFriend(authorization);
    res.status(200).json({ message: "successfuly", data });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//create Request
module.exports.createRequest = async (req, res) => {
  try {
    let { userId_answer } = req.body;
    let { authorization } = req.headers;
    let now = new Date();
    setRequestFriendShip(authorization, userId_answer, now);
    res
      .status(201)
      .json({ message: "Request successfuly", status: "successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
//accept Request
module.exports.acceptRequest = async (req, res) => {
  try {
    let { id } = req.params;
    let { authorization } = req.headers;
    let now = new Date();
    await setFriendShip(now, id, authorization);
    res.status(201).json({ message: "Accept successfuly" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//Delete Request
module.exports.cancelRequest = async (req, res) => {
  try {
    let { id } = req.params;
    let { authorization } = req.headers;
    await deleteFriendShip(id, authorization);
    res.status(201).json({ message: "Delete successfuly" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//từ chối Request
module.exports.rejectRequest = async (req, res) => {
  try {
    let { id } = req.params;
    let { authorization } = req.headers;
    await deleteFriendShip(authorization, id);
    res.status(201).json({ message: "Delete successfuly" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//Update avatar + cover
module.exports.updateUserPhoto = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let { key } = req.query;
    let path = req.file
      ? `http://localhost:8000/assits/${req.file.filename}`
      : "";
    await setUserPhoto(key, path, authorization);
  } catch (error) {
    console.log(error);
  }
};
