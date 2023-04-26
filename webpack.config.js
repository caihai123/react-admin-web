const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const child_process = require("child_process");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dayjs = require("dayjs");

const APP_NAME = "React Or Antd";

module.exports = (_, argv) => {
  const { mode } = argv;

  process.env.NODE_ENV = mode; // .eslintrc.js中需要访问

  const isEnvDevelopment = mode === "development";
  const isEnvProduction = mode === "production";

  // 环境变量
  const env = {
    NODE_ENV: JSON.stringify(mode),

    // app TITLE
    REACT_APP_WEBSITE_NAME: JSON.stringify(APP_NAME),

    // commitHash
    REACT_APP_Commit_Hash: JSON.stringify(
      child_process.execSync("git show -s --format=%H").toString().trim()
    ),

    // 是否开启 mockapi
    REACT_APP_MOCK: true,

    // 打包时间（启动时间）
    REACT_APP_Build_Date: JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss")),
  };

  const devServer = {
    historyApiFallback: true,
    port: 8080,
    open: false, // 是否自动打开浏览器
    hot: true, // 是否开启热更新
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

  return {
    mode,
    entry: "./src/index.js",
    devtool: isEnvProduction ? false : "eval",
    devServer,
    output: {
      publicPath: "/",
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/bundle.js",
      chunkFilename: isEnvProduction
        ? "static/js/[name].[contenthash:8].chunk.js"
        : isEnvDevelopment && "static/js/[name].chunk.js",
      path: path.resolve(__dirname, "dist"),
      clean: true, // 清除dist文件
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [
            isEnvProduction && MiniCssExtractPlugin.loader,
            isEnvDevelopment && "style-loader",
            "css-loader",
          ].filter(Boolean),
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192, // 8kb以下转base64
                name: "static/image/[name].[hash].[ext]", // 文件名格式
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      extensions: [".js", ".jsx", ".css"],
    },
    plugins: [
      // 设置环境变量
      new webpack.DefinePlugin({ "process.env": env }),

      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
        minify: isEnvProduction
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : undefined,
      }),
      // 执行eslint校验
      new ESLintPlugin({ emitWarning: true }),

      // 打印编译进度
      new webpack.ProgressPlugin(),

      // 将css提取到单独的文件中
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ].filter(Boolean),
  };
};
