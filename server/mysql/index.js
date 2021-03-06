const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123123",
  database: "mr_trace",
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
