//index 路由文件
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TIME } = require("../config");

//操作数据库
const dbModel = require("../lib/db");

// 新建文件函数
exports.insertFile = async (req, res) => {
  let { file_upload_time, file_type, file_link, file_suffix, file_name, file_size, file_region, file_user_id, file_user_name, file_remark, file_address, file_view } = req.body; //解构赋值
  await dbModel
    .insertFile([file_upload_time, file_type, file_link, file_suffix, file_name, file_size, file_region, file_user_id, file_user_name, file_remark, file_address, file_view])
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

// 新建用户函数
exports.createUser = async (req, res) => {
  let { username, password, email, sex, sign, age, phone, avatar, create_time } = req.body; //解构赋值
  await dbModel
    .createUser([username, password, email, sex, sign, age, phone, avatar, create_time])
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

//判断邮箱是否相同
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
        let token = jwt.sign({ email, password }, TOKEN_KEY, { expiresIn: TIME });
        res.send({
          code: 200,
          message: "登录成功！",
          token: "Bearer " + token,
          userObj: {
            id: result[0].user_id,
            username: result[0].username,
            avatar: result[0].avatar,
            email: result[0].email,
            banana_num: result[0].banana_num,
            sign: result[0].sign,
            create_time: result[0].create_time,
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
exports.findFile = async (req, res) => {
  let { user_id } = req.body; //解构赋值
  await dbModel
    .findFile([user_id])
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
  await dbModel
    .findAllFile()
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
  let { file_user_id, file_suffix, file_name, file_remark } = req.body; //解构赋值 //查询用户, (文件类型)后缀名file_suffix  文件名称file_name 文件备注信息file_remark 查询时间范围
  await dbModel
    .fileMultipleFind([file_user_id])
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
