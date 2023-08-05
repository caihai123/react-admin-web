const env = require("./env");

module.exports = {
  https: env.HTTPS,
  port: env.PORT || 8080,
  open: false, // 是否自动打开浏览器
  // proxy: {
  //   "/api": {
  //     target: "",
  //     ws: true,
  //     changeOrigin: true,
  //     pathRewrite: {
  //       "^/api": "",
  //     },
  //   },
  // },
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
    logging: "none", // 不在浏览器控制台显示日志
  },
  static: {
    publicPath: env.PUBLIC_PATH,
  },
  devMiddleware: {
    publicPath: env.PUBLIC_PATH.slice(0, -1),
  },
  historyApiFallback: {
    disableDotRule: true,
    index: env.PUBLIC_PATH,
  },
};
