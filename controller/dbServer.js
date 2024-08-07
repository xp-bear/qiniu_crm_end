//index 路由文件
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TIME } = require("../config");

//操作数据库
const dbModel = require("../lib/db");

// 1.添加文件函数-已修改
exports.insertFile = async (req, res) => {
  // let { file_upload_time, file_type, file_link, file_suffix, file_name, file_size, file_region, file_user_id, file_user_name, file_remark, file_address, file_view } = req.body; //解构赋值
  let { file_createtime, file_type, file_name, file_suffix, file_link, file_size, file_region, file_user_id, file_user_name, file_likes, file_views, file_remark, file_address, file_public } =
    req.body;

  await dbModel
    .insertFile([file_createtime, file_type, file_name, file_suffix, file_link, file_size, file_region, file_user_id, file_user_name, file_likes, file_views, file_remark, file_address, file_public])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
        err,
      });
    });
};

// 2.新建用户函数-已修改
exports.createUser = async (req, res) => {
  let { user_name, user_password, user_email, user_sex, user_sign, user_avatar, user_createtime } = req.body; //解构赋值
  await dbModel
    .createUser([user_name, user_password, user_email, user_sex, user_sign, user_avatar, user_createtime])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
        err,
      });
    });
};

//判断邮箱是否相同-已修改
exports.sameEmail = async (req, res) => {
  let { email } = req.body; //解构赋值
  await dbModel
    .sameEmail([email])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

// 登录接口
exports.userLogin = async (req, res) => {
  let { email, password } = req.body; //解构赋值
  await dbModel
    .userLogin([email, password])
    .then((result) => {
      if (result.length == 0) {
        res.send({
          code: 400,
          message: "用户名或者密码错误！",
        });
      } else {
        let token = Date.now() + 1000 * 60 * 60 * 24 * 7; //7天token过期

        // setTimeout(() => {
        //   const data = jwt.verify(token, "xiong-zai-tu-chaung");
        //   console.log(data);
        // }, 11000);

        res.send({
          code: 200,
          message: "登录成功！",
          token: token, //jwt 生成的token
          userObj: {
            id: result[0].user_id,
            username: result[0].user_name,
            avatar: result[0].user_avatar,
            email: result[0].user_email,
            user_money: result[0].user_money,
            sign: result[0].user_sign,
            create_time: result[0].user_createtime,
          },
        });
      }
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

// 查询文件接口
exports.findFileCounter = async (req, res) => {
  let { user_id, file_type } = req.body; //解构赋值
  await dbModel
    .findFileCounter([user_id, file_type])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

exports.findAllFile = async (req, res) => {
  let { user_id } = req.body; //解构赋值
  await dbModel
    .findAllFile([user_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
        count: result.length,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

// 删除文件接口
exports.deleteFile = async (req, res) => {
  let { file_id } = req.body; //解构赋值
  await dbModel
    .deleteFile([file_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

// 增加浏览量接口
exports.updateScreenNumber = async (req, res) => {
  let { file_id } = req.body; //解构赋值
  await dbModel
    .updateScreenNumber([file_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};

//增加香蕉接口
exports.insertBanana = async (req, res) => {
  let { user_id } = req.body; //解构赋值
  await dbModel
    .insertBanana([user_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
      });
    });
};
// 10.修改用户信息接口
exports.updateUserInfo = async (req, res) => {
  let { avatar, username, sign, user_id } = req.body; //解构赋值
  await dbModel
    .updateUserInfo([avatar, username, sign, user_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
        err: err,
      });
    });
};
// 11.修改文件表的文件所属者
exports.fileEditName = async (req, res) => {
  let { file_user_name, file_user_id } = req.body; //解构赋值
  await dbModel
    .fileEditName([file_user_name, file_user_id])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
        err: err,
      });
    });
};
// 12.相关文件多条件查询。
exports.fileMultipleFind = async (req, res) => {
  let { file_user_id, file_type, file_name, file_remark, time_range, page_num, page_size } = req.body; //解构赋值 //查询用户, (文件类型)后缀名file_suffix  文件名称file_name 文件备注信息file_remark 查询时间范围
  // console.log("---", file_user_id, file_type, file_name, file_remark, time_range, page_num, page_size);
  await dbModel
    .fileMultipleFind([file_user_id, file_type, file_name, file_remark, time_range, page_num, page_size])
    .then((result) => {
      res.send({
        code: 200,
        message: result,
        count: result.length,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        message: "服务器出大问题!",
        err: err,
      });
    });
};
