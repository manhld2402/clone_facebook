const { db } = require("../utils/database");
const mysql = require("mysql2");
module.exports.findByProperty = async (table, key, value) => {
  let sql = "SELECT * FROM ?? WHERE ??=?";
  let inserts = [table, key, value];
  sql = mysql.format(sql, inserts);
  let find = await db.execute(sql);
  let [result] = find;
  return result;
};
module.exports.deleteByProperty = (table, key, value) => {
  let sql = "DELETE FROM ?? WHERE ??=?";
  let inserts = [table, key, value];
  sql = mysql.format(sql, inserts);
  return db.execute(sql);
};
