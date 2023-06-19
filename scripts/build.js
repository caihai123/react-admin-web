const webpack = require("webpack");
const configFactory = require("../config/webpack.config");

process.env.NODE_ENV = "production";
const webpackConfig = configFactory(process.env.NODE_ENV);

webpack(webpackConfig).run(() => {});
