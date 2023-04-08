const path = require("path");
const WebpackBar = require("webpackbar");
const child_process = require("child_process");

// app TITLE
process.env.REACT_APP_WEBSITE_NAME = "安心干管理后台";

// commitHash
process.env.REACT_APP_Commit_Hash = child_process
  .execSync("git show -s --format=%H")
  .toString()
  .trim();

process.env.REACT_APP_MOCK = true; // 是否开启 mockapi

// 打包时间（启动时间）
process.env.REACT_APP_Build_Date = (() => {
  const nowDate = new Date();
  return `${`${nowDate.getFullYear()}-${
    nowDate.getMonth() + 1
  }-${nowDate.getDate()} ${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`}`;
})();

module.exports = {
  devServer: {
    port: 1234,
    open: false, //构建完成之后自动打开谷歌
    proxy: {
      "/api": {
        target: "https://test-portal.gshbzw.com",
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   "^/api": "",
        // },
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
