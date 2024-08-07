// 发送邮箱验证码配置
//引入模块
const nodemailer = require("nodemailer");

let sendMails = (mailId, VerificationCode) => {
  //设置邮箱配置
  let transporter = nodemailer.createTransport({
    //host:'smtp.qq.com',    //邮箱服务的主机，如smtp.qq.com
    service: "qq",
    port: "465", //对应的端口号QQ邮箱的端口号是465
    secure: false, //开启安全连接
    //secureConnection:false,   //是否使用ssl
    auth: {
      //用户信息
      user: "coderxp@qq.com", //用来发邮件的邮箱账户
      pass: "cynztxfbsmvjdhia", //这里的密码是qq的smtp授权码，可以去qq邮箱后台开通查看
    },
  });

  //设置收件人信息
  let mailOptions = {
    from: "coderxp@qq.com", //谁发的
    to: mailId, //发给谁
    subject: "熊仔网盘服务平台(邮箱注册)", // 邮箱主题, //主题是什么
    text: "注册邮箱验证码", //文本内容
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
                    h1 { font-size: 32px !important; line-height: 32px !important; }
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
                            <p><span class="button">${VerificationCode}</span></p>
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

  return new Promise((resolve, reject) => {
    //异步函数
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error); //错误
      } else {
        resolve(info);
        // console.log(`信息id   Message: ${info.messageId}`);
        // console.log(`成功响应 sent: ${info.response}`);
        // console.log(`邮件信息 mailOptions: ${JSON.stringify(mailOptions)}`);
      }
    });
  });
};

let getVerificationCode = (codeLength = 4) => {
  //传入需要的字符串长度，不传默认为4
  // 准备一个用来抽取码的字符串，或者字典
  let verification_code_str = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //数字和字母
  // let verification_code_str = "0123456789"; //纯数字
  // 获取某个范围的随机整数，封装的函数，在上面抽取字典的时候进行了调用
  function getRandom(min, max) {
    //意思是获取min-max数字之间的某个随机数，直接调用即可
    return Math.round(Math.random() * (max - min) + min);
  }
  let newStr = ""; //创建一个空字符串，用来拼接四位随机码
  for (var i = 0; i < codeLength; i++) {
    //for循环四次，则拼接四次随机码
    newStr += verification_code_str[getRandom(0, verification_code_str.length - 1)]; //从字典中随机选一个下标，并拼接到空字符串中
  }
  return newStr;
};

//调用
// let mycode = getVerificationCode(); //可以不传值，默认为4位随机码
// console.log("生成的随机码为：" + mycode);

// export default sendMails  暴露出去
module.exports = {
  sendMails,
  getVerificationCode,
};
