const controller = require("../controller/mdbServer"); //控制器
module.exports = function (app) {
  //1. 欢迎pc图床界面
  app.get("/pcget", (req, res) => {
    res.send({
      code: 200,
      msg: "新版pc接口启动成功...",
    });
  });
  // 2. 新pc端查询数据接口
  app.post("/pcsearchfile", (req, res) => {
    controller.pcsearchfile(req, res);
  });
};
