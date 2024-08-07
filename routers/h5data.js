const controller = require("../controller/mdbServer"); //控制器
module.exports = function (app) {
  // 欢迎路由页面
  app.get("/h5", (req, res) => {
    res.send({
      code: 200,
      msg: "移动端接口启动成功!",
      ip: req.ip,
    });
  });
  // 1.移动端 查询文件接口
  app.post("/msearchfile", (req, res) => {
    controller.msearchfile(req, res);
  });

  // 2.移动端 新建文件接口
  app.post("/minsertfile", (req, res) => {
    controller.minsertfile(req, res);
  });

  // 3.移动端 修改文件共享与隐私状态
  app.post("/mispublic", (req, res) => {
    controller.mispublic(req, res);
  });

  // 4.移动端 查询共享文件的数据 file_public=1的数据 已经写死了
  app.post("/msearchsharefile", (req, res) => {
    controller.msearchsharefile(req, res);
  });

  // 5.移动端 增加浏览量的接口
  app.get("/minsertview", (req, res) => {
    controller.minsertview(req, res);
  });

  // 6.移动端 根据文件id增加收藏量
  app.get("/minsertlike", (req, res) => {
    controller.minsertlike(req, res);
  });

  // 7.查询用户对文件的收藏情况
  app.post("/msearchlikefile", (req, res) => {
    controller.msearchlikefile(req, res);
  });
  // 8.新增一条收藏红心数据
  app.post("/minsertlikefile", (req, res) => {
    controller.minsertlikefile(req, res);
  });
};
