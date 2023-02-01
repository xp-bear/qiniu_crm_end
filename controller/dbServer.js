//index 路由文件
const jwt = require("jsonwebtoken");
const { TOKEN_KEY, TIME } = require("../config");

//操作数据库
const dbModel = require("../lib/db");

// 新建文件函数
exports.insertFile = async (req, res) => {
  let { file_upload_time, file_type, file_link, file_suffix, file_name, file_user_id, file_user_name, file_remark, file_address, file_view } = req.body; //解构赋值
  await dbModel.insertFile([file_upload_time, file_type, file_link, file_suffix, file_name, file_user_id, file_user_name, file_remark, file_address, file_view]).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

// 新建用户函数
exports.createUser = async (req, res) => {
  let { username, password, email, sex, sign, age, phone, avatar, create_time } = req.body; //解构赋值
  await dbModel.createUser([username, password, email, sex, sign, age, phone, avatar, create_time]).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

//判断邮箱是否相同
exports.sameEmail = async (req, res) => {
  let { email } = req.body; //解构赋值
  await dbModel.sameEmail([email]).then((result) => {
    res.send({
      code: 200,
      message: result,
    });
  });
};

// 登录接口
exports.userLogin = async (req, res) => {
  let { email, password } = req.body; //解构赋值
  await dbModel.userLogin([email, password]).then((result) => {
    if (result.length == 0) {
      res.send({
        code: 400,
        message: "用户名或者密码错误。",
      });
    } else {
      let token = jwt.sign({ email, password }, TOKEN_KEY, { expiresIn: TIME });
      res.send({
        code: 200,
        message: "登录成功。",
        token: "Bearer " + token,
        userObj: {
          id: result[0].user_id,
          username: result[0].username,
          avatar: result[0].avatar,
        },
      });
    }
  });
};
