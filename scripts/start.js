/* eslint-disable no-console */
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devServerConfig = require("../config/devServer");
const configFactory = require("../config/webpack.config");
// const clearConsole = require("react-dev-utils/clearConsole");
const chalk = require("react-dev-utils/chalk");
const { prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");
const address = require("address");
const defaultGateway = require("default-gateway"); // 在 package.json 中找不到，他是 webpack-dev-server下面的一个依赖
const url = require("url");
const env = require("../config/env");

process.env.NODE_ENV = "development";

const pathname = env.PUBLIC_PATH.slice(0, -1);
const webpackConfig = configFactory(process.env.NODE_ENV);
const compiler = webpack(webpackConfig);

const { https = false, port, host = "0.0.0.0" } = devServerConfig; // 端口
const protocol = https ? "https" : "http";

const getLanUrlForTerminal = function () {
  const result = defaultGateway.v4.sync();
  const lanUrlForConfig = address.ip(result && result.interface);
  const lanUrlForTerminal = url.format({
    protocol,
    hostname: lanUrlForConfig,
    port,
    pathname,
  });
  return lanUrlForTerminal;
};

compiler.hooks.done.tap("my-serve", (stats) => {
  if (stats.hasErrors()) {
    return;
  }
  const urls = prepareUrls(protocol, host, port, pathname);
  const lanUrlForTerminal = getLanUrlForTerminal();
  console.log();
  console.log(`  App running at:`);
  console.log(`  - Local:   ${chalk.cyan(urls.localUrlForBrowser)}`);
  console.log(`  - Network: ${chalk.cyan(lanUrlForTerminal)}`);
  console.log();
  console.log("  Note that the development build is not optimized.");
  console.log(
    `  To create a production build, run ${chalk.cyan("npm run build")}.`
  );
  console.log();
});

const devServer = new WebpackDevServer(devServerConfig, compiler);

devServer.startCallback(() => {
  console.log(
    chalk.bgBlue.black(" INFO ") + chalk.cyan(" 正在启动开发服务器...\n")
  );
});
