const { findByProperty } = require("../Models/general.model");

module.exports.getDataClient = async (req, res) => {
  try {
    let { authorization } = req.headers;
    let getData = await findByProperty("tb_user", "user_id", authorization);
    if (getData[0]) {
      res.status(200).json({
        status: "Lấy dữ liệu thành công",
        data: { ...getData[0], password: null },
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
