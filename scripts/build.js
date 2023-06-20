/* eslint-disable no-console */
const webpack = require("webpack");
const configFactory = require("../config/webpack.config");
const chalk = require("react-dev-utils/chalk");

process.env.NODE_ENV = "production";
const webpackConfig = configFactory(process.env.NODE_ENV);

const build = function () {
  console.log(
    chalk.bgBlue.black(" INFO ") + chalk.cyan(" 生产代码打包中，请等待...\n")
  );
  webpack(webpackConfig).run((err, stats) => {
    console.log(
      chalk.bgBlue.black(" INFO ") + chalk.cyan(" 打包成功，dist文件已准备好！")
    );
  });
};

build();
