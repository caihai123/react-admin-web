/* eslint-disable no-console */
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const devServerConfig = require("../config/devServer");
const configFactory = require("../config/webpack.config");
// const clearConsole = require("react-dev-utils/clearConsole");
const chalk = require("react-dev-utils/chalk");
const { prepareUrls } = require("react-dev-utils/WebpackDevServerUtils");

process.env.NODE_ENV = "development";

const webpackConfig = configFactory(process.env.NODE_ENV);
const compiler = webpack(webpackConfig);

compiler.hooks.done.tap("my-serve", (stats) => {
  if (stats.hasErrors()) {
    return;
  }
  const urls = prepareUrls("http", "0.0.0.0", devServerConfig.port, "/");
  console.log();
  console.log(`  App running at:`);
  console.log(`  - Local:   ${chalk.cyan(urls.localUrlForBrowser)}`);
  console.log(`  - Network: `);
  console.log();
  console.log("  Note that the development build is not optimized.");
  console.log(
    `  To create a production build, run ${chalk.cyan("npm run build")}.`
  );
});
const devServer = new WebpackDevServer(devServerConfig, compiler);

devServer.start();
