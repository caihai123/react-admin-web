module.exports = {
  historyApiFallback: true,
  port: 8080,
  open: false, // 是否自动打开浏览器
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
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
};
