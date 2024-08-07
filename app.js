// 启动文件
const express = require("express");
const cors = require("cors");
const config = require("./config");
const app = express();
app.use(cors()); //跨域处理

// 解析前端数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 七牛云上传文件处理的路由
require("./routers/qiniu")(app);
// 数据处理路由
require("./routers/data")(app);
// 移动端请求接口
require("./routers/h5data")(app);

// 新版PC图床请求接口
require("./routers/pcdata")(app);

app.listen(config.port, () => {
  console.log(`服务启动成功! http://localhost:${config.port}`);
});
