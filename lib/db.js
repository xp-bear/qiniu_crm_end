// 数据库操作
const mysql = require("mysql2");
const config = require("../config"); //常量

// 获取下一个日期。
const { getNextDate } = require("../utils/format");

// 链接mysql数据库,进行创建数据库的操作
const db = mysql.createConnection({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
});

//链接指定数据库
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DBS, //数据库链接
});

// 使用promise封装查询数据库的操作
let bdbs = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

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

// 创建数据库 qiniucloud 数据库
let createDB = `create database if not exists qiniucloud default charset utf8 collate utf8_general_ci;`;
// 创建数据库
let createDatabase = (sql) => {
  return bdbs(sql, []);
};

// 创建表
let createTable = (sql) => {
  return query(sql, []);
};

// 建表sql语句
// file表
let file_sql = `create table if not exists file(
    file_id INT NOT NULL AUTO_INCREMENT  COMMENT '主键id',  
    file_createtime VARCHAR(100) NOT NULL COMMENT '上传时间',
    file_type INT NOT NULL COMMENT '文件类型 0-图片  1-视频  2-音乐 3-压缩包 4-安装包 5-代码文本 6-记事本 7-office文件 8-其他文件',
    file_name VARCHAR(200) NOT NULL COMMENT '文件名',
    file_suffix VARCHAR(100) NOT NULL COMMENT '文件后缀名',
    file_link VARCHAR(300) NOT NULL COMMENT '文件地址链接',
    file_size VARCHAR(100) NOT NULL COMMENT '文件大小',
    file_region VARCHAR(100) NOT NULL COMMENT '存储区域',
    file_user_id INT NOT NULL COMMENT '所属者上传id',
    file_user_name VARCHAR(100) NOT NULL COMMENT '所属者用户昵称',
    file_likes INT NOT NULL COMMENT '文件点赞数量',
    file_views INT NOT NULL  COMMENT '文件浏览量',
    file_remark VARCHAR(500)  COMMENT '上传文件备注',
    file_address VARCHAR(100)  COMMENT '图片上传地址位置',
    file_public INT NOT NULL  COMMENT '文件是否公开 0-私有  1-公开',
    PRIMARY KEY(file_id)
)`;

//user表
let user_sql = `create table if not exists user(
    user_id INT NOT NULL AUTO_INCREMENT  COMMENT '用户id',  
    user_name VARCHAR(100) NOT NULL COMMENT '用户名',
    user_password VARCHAR(100) NOT NULL COMMENT '密码',
    user_email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    user_sex  INT NOT NULL COMMENT '性别 0男 1女 2未知',
    user_sign VARCHAR(100) COMMENT '个人签名',
    user_avatar VARCHAR(200)  COMMENT '用户头像链接',
    user_createtime VARCHAR(100) NOT NULL COMMENT '用户创建时间', 
    user_money INT NOT NULL DEFAULT "0"  COMMENT '用户金币余额',
    PRIMARY KEY(user_id)
)`;

// favorite表 (点赞表)
let favorite_sql = `create table if not exists favorite(
    favorite_id INT NOT NULL AUTO_INCREMENT COMMENT '点赞id',  
    favorite_user_id INT NOT NULL  COMMENT '点赞用户id',  
    favorite_file_id  INT NOT NULL COMMENT '点赞文件id',  
    favorite_createtime VARCHAR(100) NOT NULL COMMENT '点赞时间', 
    PRIMARY KEY(favorite_id)
)`;

// // feedback表 (反馈表)
let feedback_sql = `create table if not exists feedback(
    fb_id  INT NOT NULL AUTO_INCREMENT COMMENT '反馈id',  
    fb_file_id INT NOT NULL COMMENT '反馈文件id',  
    fb_state INT NOT NULL COMMENT '反馈状态 0-反馈失败  1-审核中  2-反馈成功',  
    fb_user_id INT NOT NULL COMMENT '反馈者用户id',  
    fb_comment INT  COMMENT '反馈备注信息',  
    fb_createtime VARCHAR(100) NOT NULL COMMENT '反馈时间', 
    PRIMARY KEY(fb_id)
)`;

// // collect表 (收藏表)
let collect_sql = `create table if not exists collect(
   collect_id INT NOT NULL AUTO_INCREMENT COMMENT '收藏用户自己id',  
   collect_user_id INT NOT NULL COMMENT '收藏文件所属者id',  
   collect_file_id INT NOT NULL COMMENT '收藏文件id',  
   collect_file_type INT NOT NULL COMMENT '收藏文件类型  0-图片  1-视频  2-音乐 3-压缩包 4-安装包 5-代码文本 6-记事本 7-office文件 8-其他文件',  
   collect_createtime VARCHAR(100) NOT NULL COMMENT '收藏时间', 
   PRIMARY KEY(collect_id)     
)`;

//先创建数据库再创建表
async function create() {
  await createDatabase(createDB);

  await createTable(file_sql);
  await createTable(user_sql);
  await createTable(favorite_sql);
  await createTable(feedback_sql);
  await createTable(collect_sql);
}
create();
//
// -----------------------------------------------------------------------------------------------
// 书写SQL语句

// 1.新建文件SQL语句
exports.insertFile = (value) => {
  let _sql = `insert into file set  file_createtime=?, file_type=?,  file_name=?, file_suffix=?, file_link=?,  file_size=?,file_region=?, file_user_id=?,file_user_name=?, file_likes=?,file_views=?, file_remark=?, file_address=?, file_public=?;`;
  return query(_sql, value);
};

// 2.新建用户SQL语句
exports.createUser = (value) => {
  let _sql = `insert into user set  user_name=?,user_password=?,user_email=?,user_sex=?,user_sign=?,user_avatar=?,user_createtime=?;`;
  return query(_sql, value);
};

// 3.判断邮箱是否唯一
exports.sameEmail = (value) => {
  let _sql = `select count(*) as SameEmail from user where user_email=?;`;
  return query(_sql, value);
};

// 4.用户登录接口
exports.userLogin = (value) => {
  let _sql = `select *  from user where user_email=? and user_password=?;`;
  return query(_sql, value);
};

// 5.查询该用户文件的数量
exports.findFileCounter = (value) => {
  let use_id = value[0];
  let file_type = value[1];

  let _sql = `select count(*) as total_number from file where 1=1`;
  if (use_id) {
    _sql += " and file_user_id=?";
  }
  if (file_type) {
    _sql += " and file_type=?";
  }

  return query(_sql, value);
};

// 6.删除文件接口
exports.deleteFile = (value) => {
  let _sql = `delete from file where file_id=?;`;
  return query(_sql, value);
};

// 7.增加文件浏览量接口
exports.updateScreenNumber = (value) => {
  let _sql = `update file set file_views=file_views + 1 where file_id=?;`;
  return query(_sql, value);
};

// 8.查询文件所有数据
exports.findAllFile = (value) => {
  let _sql = `select * from file where file_user_id!=? order by file_createtime desc;`;
  return query(_sql, value);
};

// 9.增加金币接口
exports.insertBanana = (value) => {
  let _sql = `update user set user_money=user_money + 1 where user_id=?;`;
  return query(_sql, value);
};

// 10.修改用户信息接口
exports.updateUserInfo = (value) => {
  let _sql = `update user set user_avatar=?, user_username=?, user_sign=? where user_id=?;`;
  return query(_sql, value);
};

// 11.修改文件表的文件所属者
exports.fileEditName = (value) => {
  let _sql = `update file set file_user_name=? where file_user_id=?;`;
  return query(_sql, value);
};

// 12.相关文件多条件查询。
// select * from files where file_upload_time between  Date('2023-2-7') and Date('2023-2-9'); 查询2-7到2-8的数据
exports.fileMultipleFind = (value) => {
  let _sql = `select * from file where file_user_id=?`;
  let file_user_id = value[0];
  let file_type = value[1];
  let file_name = value[2];
  let file_remark = value[3];
  let time_range = value[4];
  let page_num = value[5];
  let page_size = value[6];
  time_range = eval(time_range); //把字符串转数组 ['2023-2-2', '2023-2-17']
  let sql_arr = [file_user_id];

  //  文件类型
  if (file_type) {
    sql_arr.push(parseInt(file_type));
    _sql += " and file_type=?";
  }
  // 文件名称
  if (file_name) {
    sql_arr.push(`%${file_name}%`);
    _sql += " and file_name like ?";
  }
  // 文件备注
  if (file_remark) {
    sql_arr.push(`%${file_remark}%`);
    _sql += " and file_remark like ?";
  }
  // 时间选择
  if (time_range) {
    sql_arr.push(time_range[0]);
    sql_arr.push(getNextDate(time_range[1]));
    _sql += " and file_createtime between  Date(?) and Date(?)";
  }

  // 排序操作
  _sql += " order by file_createtime desc";

  // 分页操作
  sql_arr.push((page_num - 1) * page_size);
  sql_arr.push(page_size);
  _sql += " limit ?,?";
  // console.log(sql_arr, _sql);

  return query(_sql, sql_arr);
};
