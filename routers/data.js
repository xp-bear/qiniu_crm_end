const controller = require("../controller/dbServer"); //控制器
const { sendMails, getVerificationCode } = require("../utils/email");

const nodemailer = require("nodemailer");
module.exports = function (app) {
  // 新建文件路由
  app.post("/insertfile", (req, res) => {
    controller.insertFile(req, res);
  });

  // 注册用户路由
  app.post("/createuser", (req, res) => {
    controller.createUser(req, res);
  });

  // 发送qq 邮件函数路由
  app.post("/sendmail", async (req, res) => {
    let { user_email } = req.body;
    //测试邮件
    let mailId = user_email || ""; //收件人的邮箱账号
    // let VerificationCode = "8888"; //四位验证码，随机码下面有封装，直接调用即可
    // let VerificationCode = getVerificationCode(); //生成随机码
    let verify = Math.random().toFixed(6).slice(-6); // 随机6位验证码
    // console.log("发送的验证码为：" + VerificationCode); //查看随机码

    try {
      let result = await sendMails(mailId, verify);
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
          VerificationCode: verify,
          message: "邮件发送成功！",
        });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        code: 500,
        message: "邮件发送失败！",
      });
    }
  });

  // 发送网易邮箱验证码
  app.post("/wangyiemail", (req, res) => {
    let { user_email } = req.body;
    let verify = Math.random().toFixed(6).slice(-6); // 随机6位验证码

    // 配置信息
    const mailconfig = {
      host: "smtp.163.com", // 是什么邮箱，就修改为什么格式，如qq邮箱为：smtp.qq.com
      port: 465, // 默认端口
      auth: {
        user: "coderxp@163.com", // 注册的163邮箱账号
        pass: "KTRCCRTYCTDTMOCV", // 邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
      },
    };

    // 发送前准备
    var mail = {
      // 发件人
      from: "<" + mailconfig.auth.user + ">",
      // 主题
      subject: "熊仔网盘服务平台(邮箱注册)", // 邮箱主题
      // 收件人
      to: user_email, // 前台传过来的邮箱
      // 邮件内容，HTML格式
      html: `
      <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>邮箱验证</title>
            <style type="text/css">
                body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
                table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
                img { -ms-interpolation-mode: bicubic; }

                /* CLIENT-SPECIFIC STYLES */
                body { width: 100% !important; height: 100%; line-height: 1.6em; margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 15px; color: #333; }
                .container { display: block !important; max-width: 600px !important; margin: 0 auto !important; clear: both !important; }
                .content { padding: 20px; background-color: #fff; border-radius: 8px; background-color: #f6f6f6; }
                .header { padding: 40px 0; background-color: #0073b7; color: #ffffff; }
                .button { display: inline-block; padding: 10px 20px; background-color: #0073b7; color: #ffffff; text-decoration: none; border-radius: 5px; }
                .footer { padding: 20px 0; text-align: center; font-size: 12px; color: #999; }

                /* MOBILE STYLES */
                @media screen and (max-width: 600px) {
                    .header td h1{ margin-top: 20px;}
                }
            </style>
        </head>
        <body style="margin:0; padding:0;">
            <center class="container">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- HEADER -->
                    <tr class="header">
                        <td align="center">
                            <h1>欢迎使用熊仔网盘</h1>
                        </td>
                    </tr>
                    <!-- END HEADER -->

                    <!-- CONTENT -->
                    <tr>
                        <td class="content">
                            <p>亲爱的用户，</p>
                            <p>感谢您注册我们的服务。为了确保您的账户安全，请输入下面的验证码完成邮箱验证。</p>
                            <p><span class="button">${verify}</span></p>
                            <p>如果您没有请求此操作，请忽略这封邮件或联系我们。</p>
                            <p>谢谢！</p>
                        </td>
                    </tr>
                    <!-- END CONTENT -->

                    <!-- FOOTER -->
                    <tr class="footer">
                        <td>
                            <p>如有任何问题，请联系我们的支持团队：<a href="http://xxoutman.cn/">http://xxoutman.cn/</a></p>
                        </td>
                    </tr>
                    <!-- END FOOTER -->
                </table>
            </center>
        </body>
      </html>
      `,
    };

    // 创建一个SMTP客户端对象
    const transporter = nodemailer.createTransport(mailconfig);

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
        return res.send({
          code: 500,
          message: "邮件发送失败！",
        });
      } else {
        console.log("mail sent:" + info.response);
        if (info.response.includes("250 Mail OK")) {
          return res.send({
            code: 200,
            VerificationCode: verify,
            message: "邮件发送成功！",
          });
        }
      }
    });
  });

  // 判断邮箱是否相同路由
  app.post("/sameemail", (req, res) => {
    controller.sameEmail(req, res);
  });

  // 登录接口
  app.post("/userlogin", (req, res) => {
    controller.userLogin(req, res);
  });

  // 查询文件数量
  app.post("/findfilecounter", (req, res) => {
    controller.findFileCounter(req, res);
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
