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
    let mailId = useremail || "671781813@qq.com"; //收件人的邮箱账号
    // let VerificationCode = "8888"; //四位验证码，随机码下面有封装，直接调用即可
    let VerificationCode = getVerificationCode(); //生成随机码
    // console.log("发送的验证码为：" + VerificationCode); //查看随机码
    let result = await sendMails(mailId, VerificationCode);
    if (result.response == "250 OK: queued as.") {
      return res.send({
        code: 200,
        VerificationCode: VerificationCode,
        message: "邮件发送成功。",
      });
    } else {
      return res.send({
        code: 500,
        message: "邮件发送失败。",
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
};
