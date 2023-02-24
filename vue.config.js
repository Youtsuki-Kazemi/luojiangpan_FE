const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: "localhost",
    // 配置代理
    // proxy: 'http://localhost:4000', //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器
    proxy: {
      "api/": {
        // target: "http://192.168.0.106:8999",
        target: "http://0.0.0.0:8999",
        changeOrigin: true, //允许跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
