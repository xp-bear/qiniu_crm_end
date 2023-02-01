// 数据库操作
const mysql = require("mysql");
const config = require("../config"); //常量
const path = require("path");
const fs = require("fs");
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

// 创建数据库 cloud_qiniu 数据库
let createDB = `create database if not exists cloud_qiniu default charset utf8 collate utf8_general_ci;`;
// 创建数据库
let createDatabase = (sql) => {
  return bdbs(sql, []);
};

// 创建表
let createTable = (sql) => {
  return query(sql, []);
};

// 建表sql语句
// files表
let files_sql = `create table if not exists files(
    file_id INT NOT NULL AUTO_INCREMENT,  
    file_upload_time VARCHAR(100) NOT NULL COMMENT '上传时间',
    file_type INT NOT NULL COMMENT '文件类型 0-图片  1-视频  2-txt文件 3-doc文件 4-pdf文件 5-ppt文件 6-表格文件 7-压缩文件 8-未知文件',
    file_link VARCHAR(100) NOT NULL COMMENT '上传地址链接',
    file_suffix VARCHAR(50) NOT NULL COMMENT '后缀名',
    file_name VARCHAR(100) NOT NULL COMMENT '文件名',
    file_user_id INT NOT NULL COMMENT '所属者上传id',
    file_user_name VARCHAR(100) NOT NULL COMMENT '所属者上传昵称',
    file_remark VARCHAR(1000)  COMMENT '上传文件备注',
    file_address VARCHAR(100)  COMMENT '图片上传地址位置',
    file_view INT NOT NULL  COMMENT '文件浏览量',
    PRIMARY KEY(file_id)
)`;

//users表
let users_sql = `create table if not exists users(
    user_id INT NOT NULL AUTO_INCREMENT,  
    username VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(100) NOT NULL COMMENT '密码',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    sex  INT NOT NULL COMMENT '0男 1女 2未知',
    sign VARCHAR(100) COMMENT '签名',
    age  INT  COMMENT '年龄',
    phone VARCHAR(100)  COMMENT '电话',
    avatar VARCHAR(100)  COMMENT '用户头像',
    create_time VARCHAR(100) NOT NULL COMMENT '用户创建时间', 
    PRIMARY KEY(user_id)
)`;

// likes表 (点赞表)
let likes_sql = `create table if not exists likes(
    likes_id INT NOT NULL AUTO_INCREMENT,  
    likes_user_id INT NOT NULL  COMMENT '点赞用户id',  
    likes_file_id  INT NOT NULL COMMENT '点赞文件id',  
    likes_time VARCHAR(100) NOT NULL COMMENT '点赞时间', 
    PRIMARY KEY(likes_id)
)`;

// feedbacks表 (反馈表)
let feedbacks_sql = `create table if not exists feedbacks(
    fb_id  INT NOT NULL AUTO_INCREMENT,  
    fb_file_id INT NOT NULL COMMENT '反馈文件id',  
    fb_type INT NOT NULL COMMENT '反馈状态 0-涉黄 1-涉及暴力 2-其他',  
    fb_user_id INT NOT NULL COMMENT '反馈者id',  
    fb_comment INT  COMMENT '反馈备注信息',  
    fb_time VARCHAR(100) NOT NULL COMMENT '反馈时间', 
    PRIMARY KEY(fb_id)
)`;

// collects表 (收藏表)
let collects_sql = `create table if not exists collects(
   collects_id INT NOT NULL AUTO_INCREMENT,  
   collects_user_id INT NOT NULL COMMENT '收藏用户id',  
   collects_file_id INT NOT NULL COMMENT '收藏文件id',  
   collects_file_type INT NOT NULL COMMENT '收藏文件类型 0-图片  1-视频  2-txt文件 3-doc文件 4-pdf文件 5-ppt文件 6-表格文件 7-压缩文件 8-未知文件',  
   collects_time VARCHAR(100) NOT NULL COMMENT '收藏时间', 
   PRIMARY KEY(collects_id)     
)`;

//先创建数据库再创建表
async function create() {
  await createDatabase(createDB);

  await createTable(files_sql);
  await createTable(users_sql);
  await createTable(likes_sql);
  await createTable(feedbacks_sql);
  await createTable(collects_sql);
}
create();

// -----------------------------------------------------------------------------------------------
// 书写SQL语句

// 1.新建文件SQL语句
exports.insertFile = (value) => {
  let _sql = `insert into files set  file_upload_time=?, file_type=?, file_link=?, file_suffix=?, file_name=?, file_user_id=?,file_user_name=?, file_remark=?, file_address=?, file_view=?;`;
  return query(_sql, value);
};

// 2.新建用户SQL语句
exports.createUser = (value) => {
  let _sql = `insert into users set  username=?,password=?,email=?,sex=?,sign=?,age=?,phone=?,avatar=?,create_time=?;`;
  return query(_sql, value);
};

// 3.判断邮箱是否唯一
exports.sameEmail = (value) => {
  let _sql = `select count(*) as SameEmail from users where email=?;`;
  return query(_sql, value);
};

// 4.用户登录接口
exports.userLogin = (value) => {
  let _sql = `select *  from users where email=? and password=?;`;
  return query(_sql, value);
};
