//操作数据库
const dbModel = require("../lib/mdb");
// 1.移动端 查询文件接口
exports.msearchfile = async (req, res) => {
  let { file_name, file_remark, file_type, pageIndex, pageTotal, file_id } = req.body;

  await dbModel
    .msearchfile([file_name, file_remark, file_type, pageIndex, pageTotal, file_id])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};
// 2.移动端 新建文件接口
exports.minsertfile = async (req, res) => {
  let { file_createtime, file_type, file_name, file_suffix, file_link, file_size, file_region, file_user_id, file_user_name, file_likes, file_views, file_remark, file_address, file_public } =
    req.body;

  await dbModel
    .minsertfile([file_createtime, file_type, file_name, file_suffix, file_link, file_size, file_region, file_user_id, file_user_name, file_likes, file_views, file_remark, file_address, file_public])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};

// 3.移动端 修改文件共享与隐私状态 mispublic
exports.mispublic = async (req, res) => {
  let { is_public, file_id } = req.body;

  await dbModel
    .mispublic([is_public, file_id])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};

// 4.移动端 查询共享文件的数据
exports.msearchsharefile = async (req, res) => {
  let { page_index, page_total } = req.body;

  await dbModel
    .msearchsharefile([page_index, page_total])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};

// 5.移动端 增加浏览量的接口
exports.minsertview = async (req, res) => {
  let { file_id } = req.query;

  await dbModel
    .minsertview([file_id])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};

// 6.移动端 根据文件id增加收藏量
exports.minsertlike = async (req, res) => {
  let { file_id } = req.query;

  await dbModel
    .minsertlike([file_id])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};
// 7.查询用户对文件的收藏情况
exports.msearchlikefile = async (req, res) => {
  let { favorite_user_id, favorite_file_id } = req.body;

  await dbModel
    .msearchlikefile([favorite_user_id, favorite_file_id])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};
// 8.新增一条收藏红心数据
exports.minsertlikefile = async (req, res) => {
  let { favorite_user_id, favorite_file_id, favorite_createtime } = req.body;

  await dbModel
    .minsertlikefile([favorite_user_id, favorite_file_id, favorite_createtime])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};

// pc新版图床项目
// ***********************************************************
// 1.pc端 查询文件接口
exports.pcsearchfile = async (req, res) => {
  let { file_name, file_remark, file_type, pageIndex, pageTotal, file_user_id, time_range } = req.body;
  await dbModel
    .pcsearchfile([file_name, file_remark, file_type, pageIndex, pageTotal, file_user_id, time_range])
    .then((result) => {
      res.send({
        code: 200,
        msg: result,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: "服务器出大问题!",
        err,
      });
    });
};
