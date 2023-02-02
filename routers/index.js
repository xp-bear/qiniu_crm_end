// 引入七牛
const qiniu = require("qiniu");

module.exports = function (app) {
  // 起始接口
  app.get("/", (req, res) => {
    res.send({
      code: 200,
      message: "七牛后端服务启动成功~",
    });
  });
  // 返回上传文件的token值,返回给前端,根据token值进行一个上传
  //匹配GET请求路径设置回调函数
  app.get("/token", function (req, res) {
    const accessKey = "EGGnEY8AQ2_FKIfrcXerQ7Dntu7L0QEicVhYoHjS";
    const secretKey = "v-QNWJJh2S5MZ2B5nVAIce7TWAs7cH8uOev4aiSV";
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    // console.log(req.query); //请求参数: space : 当前服务器的空间
    if (!req.query.space || !req.query.name) {
      return res.send({
        code: 400,
        msg: "缺少space或者name必传参数",
      });
    }
    var options = {
      scope: req.query.space + ":" + req.query.name, //覆盖上传
      force: true,
      insertOnly: 0,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    res.json({ uploadToken });
  });

  // 删除文件操作
  app.post("/delete", (req, res) => {
    let accessKey = "EGGnEY8AQ2_FKIfrcXerQ7Dntu7L0QEicVhYoHjS";
    let secretKey = "v-QNWJJh2S5MZ2B5nVAIce7TWAs7cH8uOev4aiSV";
    let { file_name, space } = req.body;
    // file_name: 文件名
    // space: 存储区域

    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    //config.useHttpsDomain = true;
    config.zone = qiniu.zone.Zone_z2; // 华南
    var bucketManager = new qiniu.rs.BucketManager(mac, config);

    var bucket = space;
    // var key = req.body.fileName; // 传递文件名
    var key = file_name; // 传递文件名

    bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
      if (err) {
        console.log(err);
        //throw err;
      } else {
        console.log(respBody, respInfo); // 最后还是res.end
        res.send({
          code: 200,
          message: "资源删除成功!",
        });
      }
    });
  });
};
