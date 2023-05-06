const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devServerConfig = require("../config/devServer");
const configFactory = require("../config/webpack.config");
const clearConsole = require("react-dev-utils/clearConsole");
const chalk = require("react-dev-utils/chalk");

process.env.NODE_ENV = "development";

const isInteractive = process.stdout.isTTY;

const webpackConfig = configFactory(process.env.NODE_ENV);
const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(devServerConfig, compiler);

devServer.startCallback(() => {
  if (isInteractive) {
    clearConsole();
  }
  // eslint-disable-next-line no-console
  console.log(chalk.cyan("启动开发服务器...\n"));
});
