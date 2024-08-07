module.exports = {
  port: 7777,
  database: {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "root",
    DBS: "qiniucloud", //数据库
  },
  imgHost: "http://localhost:7777",
  TOKEN_KEY: "xiong-zai-tu-chaung", //设置token秘钥、过期时间。
  TIME: 60 * 60 * 24, //24h
};
