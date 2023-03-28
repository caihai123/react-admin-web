const path = require("path");
const WebpackBar = require("webpackbar");

module.exports = {
  devServer: {
    port: 1234,
    // open: 'Chrome'//构建完成之后自动打开谷歌
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
