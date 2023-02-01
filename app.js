// 启动文件
const express = require("express");
const cors = require("cors");
const config = require("./config");
const app = express();
app.use(cors()); //跨域处理

// 解析前端数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 引入路由
require("./routers/index")(app);
// 数据处理路由
require("./routers/data")(app);

app.listen(config.port, () => {
  console.log(`服务启动成功! http://localhost:${config.port}`);
});
