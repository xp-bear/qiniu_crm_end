const controller = require("../controller/dbServer"); //控制器
const { sendMails, getVerificationCode } = require("../utils/email");
module.exports = function (app) {
  // 新建文件路由
  app.post("/insertfile", (req, res) => {
    controller.insertFile(req, res);
  });

  // 新建用户路由
  app.post("/createuser", (req, res) => {
    controller.createUser(req, res);
  });

  // 发送邮件函数路由
  app.post("/sendmail", async (req, res) => {
    let { useremail } = req.body;
    //测试邮件
    let mailId = useremail || ""; //收件人的邮箱账号
    // let VerificationCode = "8888"; //四位验证码，随机码下面有封装，直接调用即可
    let VerificationCode = getVerificationCode(); //生成随机码
    // console.log("发送的验证码为：" + VerificationCode); //查看随机码

    try {
      let result = await sendMails(mailId, VerificationCode);
      // ---- 加密操作
      // let ciphertext = ""; //密文
      // for (let i = 0; i < VerificationCode.length; i++) {
      //   ciphertext += VerificationCode.charCodeAt(i) + 3 + ".";
      // }
      // // 添加混淆
      // ciphertext += Math.round(Math.random() * (200 - 100) + 100);

      // // 移位操作
      // ciphertext = ciphertext.split(".").reverse().join(".");

      /*
      // 解密
        let str = "138.109.118.68.78"; // KAsj
        let arr = str.split(".").reverse();
        arr.pop();
        let password = [];
        for (i = 0; i < arr.length; i++) {
          password.push("" + parseInt(arr[i]) - 3);
        }
        let decode = ""; //解密
        for (i = 0; i < password.length; i++) {
          decode += String.fromCharCode(password[i]);
        }
        console.log(decode);
      */
      // ----
      if (result.response == "250 OK: queued as.") {
        return res.send({
          code: 200,
          VerificationCode: VerificationCode,
          message: "邮件发送成功！",
        });
      }
    } catch (error) {
      return res.send({
        code: 500,
        message: "邮件发送失败！",
      });
    }
  });

  // 判断邮箱是否相同路由
  app.post("/sameemail", (req, res) => {
    controller.sameEmail(req, res);
  });

  // 登录接口
  app.post("/userlogin", (req, res) => {
    controller.userLogin(req, res);
  });

  // 查询文件接口
  app.post("/findfile", (req, res) => {
    controller.findFile(req, res);
  });

  // 查询所有文件接口
  app.post("/findallfile", (req, res) => {
    controller.findAllFile(req, res);
  });

  // 删除文件接口
  app.post("/deletefile", (req, res) => {
    controller.deleteFile(req, res);
  });

  // 增加浏览量接口
  app.post("/updatescreennumber", (req, res) => {
    controller.updateScreenNumber(req, res);
  });

  // 增加香蕉接口
  app.post("/insertbanana", (req, res) => {
    controller.insertBanana(req, res);
  });

  // 10.修改用户信息接口
  app.post("/updateuserinfo", (req, res) => {
    controller.updateUserInfo(req, res);
  });

  // 11.修改文件表的文件所属者
  app.post("/fileeditname", (req, res) => {
    controller.fileEditName(req, res);
  });
  // 12.相关文件多条件查询。
  app.post("/filemultiplefind", (req, res) => {
    controller.fileMultipleFind(req, res);
  });
};
