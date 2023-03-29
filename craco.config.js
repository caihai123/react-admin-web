const path = require("path");
const WebpackBar = require("webpackbar");

// app TITLE
process.env.REACT_APP_WEBSITE_NAME = "安心干管理后台";

module.exports = {
  devServer: {
    port: 1234,
    open: false, //构建完成之后自动打开谷歌
    proxy: {
      "/api": {
        target: "https://test-portal.gshbzw.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: [new WebpackBar()],
  },
};
