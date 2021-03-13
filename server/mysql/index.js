const mysql = require("mysql");
const config = require('../config.json')
const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});
connection.connect(function (err) {
  if (err) {
    console.error("数据库连接失败: " + err.stack);
    return;
  }

  console.log("数据库连接成功，id：" + connection.threadId);
});

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
        return
      }
      resolve(res)
    })
  })
}

module.exports = {
  query
};
