const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yNLinh1312",
  database: "clone_facebook",
});
const db = pool.promise();
module.exports.db = db;
