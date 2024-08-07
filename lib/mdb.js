// 数据库操作
const mysql = require("mysql2");
const config = require("../config"); //常量
// 获取下一个日期。
const { getNextDate } = require("../utils/format");

//链接指定数据库
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DBS, //数据库链接
});

// 使用promise封装查询数据库的操作
let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
          connection.release(); //释放该链接，把该链接放回池里供其他人使用
        });
      }
    });
  });
};

// 1.移动端 查询文件
exports.msearchfile = (value) => {
  let file_name = value[0];
  let file_remark = value[1];
  let file_type = value[2];
  let pageIndex = value[3];
  let pageTotal = value[4];
  let file_id = value[5];
  console.log(value);
  let sql_arr = [];

  let _sql = `select * from file where 1 `;
  if (file_type != -1) {
    _sql += " and file_type =? ";
    sql_arr.push(file_type);
  }
  if (file_id != "") {
    _sql += " and file_user_id =? ";
    sql_arr.push(file_id);
  }

  if (file_name != "") {
    file_name = "%" + file_name + "%";
    file_remark = "%" + file_remark + "%";

    _sql += ` and file_name like ? or file_remark like ? `;
    sql_arr.push(file_name);
    sql_arr.push(file_remark);
  }

  _sql += " order by file_createtime desc limit ?, ?;";
  sql_arr.push(pageIndex);
  sql_arr.push(pageTotal);
  console.log(_sql, sql_arr);
  return query(_sql, sql_arr);
};

// 2.移动端 新建文件接口
exports.minsertfile = (value) => {
  let _sql =
    "INSERT INTO `file` ( `file_createtime`,   `file_type`,  `file_name`,  `file_suffix`,   `file_link`,   `file_size`,   `file_region`,   `file_user_id`,  `file_user_name`,    `file_likes`,  `file_views`, `file_remark`,  `file_address`,  `file_public`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
  // console.log(_sql, value);
  return query(_sql, value);
};

// 3. mispublic 修改文件共享与隐私状态
exports.mispublic = (value) => {
  let _sql = "UPDATE file SET file_public=? WHERE file_id=?;";
  // console.log(_sql, value);
  return query(_sql, value);
};

//4.移动端 查询共享文件的数据
exports.msearchsharefile = (value) => {
  let _sql = "SELECT * FROM file WHERE file_public=1 AND (file_type = 0 OR file_type = 1) order by file_createtime desc LIMIT ?, ?;";
  // console.log(_sql, value);
  return query(_sql, value);
};

// 5.移动端 增加浏览量的接口
exports.minsertview = (value) => {
  let _sql = "UPDATE file SET file_views = file_views + 1 WHERE file_id=?;";
  // console.log(_sql, value);
  return query(_sql, value);
};
// 6.移动端 根据文件id增加收藏量
exports.minsertlike = (value) => {
  let _sql = "UPDATE file SET file_likes = file_likes + 1 WHERE file_id=?;";
  // console.log(_sql, value);
  return query(_sql, value);
};
// 7.查询用户对文件的收藏情况
exports.msearchlikefile = (value) => {
  let _sql = "SELECT * FROM favorite WHERE favorite_user_id=? AND favorite_file_id=?;";
  // console.log(_sql, value);
  return query(_sql, value);
};
// 8.新增一条收藏红心数据
exports.minsertlikefile = (value) => {
  let _sql = "INSERT INTO `favorite`(`favorite_user_id`,`favorite_file_id`,`favorite_createtime`) VALUES(?,?,?);";
  // console.log(_sql, value);
  return query(_sql, value);
};

// *********************************************************************
// 1.pc端 查询文件
exports.pcsearchfile = (value) => {
  let file_name = value[0];
  let file_remark = value[1];
  let file_type = value[2];
  let pageIndex = value[3];
  let pageTotal = value[4];
  let file_user_id = value[5];
  let time_range = value[6]; //把字符串转数组 ['2023-2-2', '2023-2-17']
  //  eval(time_range);
  console.log(value);
  let sql_arr = [];

  let _sql = `select * from file where 1 `;
  if (file_type != null) {
    _sql += " and file_type =? ";
    sql_arr.push(file_type);
  }
  if (file_user_id != "") {
    _sql += " and file_user_id =? ";
    sql_arr.push(file_user_id);
  }
  // 时间选择 一个范围
  if (time_range.length == 2) {
    sql_arr.push(time_range[0]);
    sql_arr.push(getNextDate(time_range[1]));
    _sql += " and file_createtime between  Date(?) and Date(?) ";
  }

  if (file_name != "") {
    file_name = "%" + file_name + "%";

    _sql += ` and file_name like ?  `;
    sql_arr.push(file_name);
  }

  if (file_remark != "") {
    file_remark = "%" + file_remark + "%";
    _sql += ` and  file_remark like ? `;
    sql_arr.push(file_remark);
  }

  _sql += " order by file_createtime desc ";
  // 判断当前搜索的所有数据
  if (pageTotal != 0) {
    _sql += " limit ?, ?;";
    sql_arr.push(pageIndex);
    sql_arr.push(pageTotal);
  }
  console.log(_sql, sql_arr);
  return query(_sql, sql_arr);
};
