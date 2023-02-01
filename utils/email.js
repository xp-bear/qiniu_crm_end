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
      user: "1693889638@qq.com", //用来发邮件的邮箱账户
      pass: "pyzsnnddjktpgaga", //这里的密码是qq的smtp授权码，可以去qq邮箱后台开通查看
    },
  });

  //设置收件人信息
  let mailOptions = {
    from: "1693889638@qq.com", //谁发的
    to: mailId, //发给谁
    subject: "熊仔图床，轻量，快速，高效。", //主题是什么
    text: "注册邮箱验证码", //文本内容
    html: `<head>
    <base target="_blank" />
    <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
    <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
    <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
    <style type="text/css">
        body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
        td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
        pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
        th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
        img{ border:0}
        header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
        blockquote{margin-right:0px}
    </style>
</head>
<body tabindex="0" role="listitem">
<table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
    <tbody>
    <tr>
        <td>
            <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                    <tbody><tr><td width="210"></td></tr></tbody>
                </table>
            </div>
            <div style="width:680px;padding:0 10px;margin:0 auto;">
                <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                    <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                    <strong style="display:block;margin-bottom:15px;">
                        您正在进行<span style="color: red">注册验证</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${VerificationCode}</span>，以完成操作。
                    </strong>
                </div>
                <div style="margin-bottom:30px;">
                    <small style="display:block;margin-bottom:20px;font-size:12px;">
                        <p style="color:#747474;">
                            注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全
                            <br>（工作人员不会向你索取此验证码，请勿泄漏！)
                        </p>
                    </small>
                </div>
            </div>
            <div style="width:700px;margin:0 auto;">
                <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                    <p>此为系统邮件，请勿回复<br>
                        请保管好您的邮箱，避免账号被他人盗用
                    </p>
                    <p>熊仔图床网络科技团队</p>
                </div>
            </div>
        </td>
    </tr>
    </tbody>
</table>
           </body>`, //html模板
    // attachments: [              //附件信息,如果需要了再打开使用
    //     {
    //         filename: '',
    //         path: '',
    //     }
    // ]
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
