const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const child_process = require("child_process");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dayjs = require("dayjs");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const env = require("./env");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  const shouldUseReactRefresh = env.FAST_REFRESH;
  const shouldUseSourceMap = env.GENERATE_SOURCEMAP;
  const assetsDir = "static";

  return {
    mode: webpackEnv,
    entry: resolveApp("src/index.tsx"),
    // eslint-disable-next-line no-nested-ternary
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : isEnvDevelopment && "cheap-module-source-map",
    output: {
      publicPath: env.PUBLIC_PATH,
      filename: isEnvProduction
        ? `${assetsDir}/js/[name].[contenthash:8].js`
        : isEnvDevelopment && `${assetsDir}/js/bundle.js`,
      chunkFilename: isEnvProduction
        ? `${assetsDir}/js/[name].[contenthash:8].chunk.js`
        : isEnvDevelopment && `${assetsDir}/js/[name].chunk.js`,
      path: resolveApp("dist"),
      clean: true, // 清除dist文件
    },
    stats: "errors-only",
    module: {
      rules: [
        // 处理包含源映射的node_modules包
        shouldUseSourceMap && {
          enforce: "pre",
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve("source-map-loader"),
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            plugins: [
              isEnvDevelopment &&
                shouldUseReactRefresh &&
                require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
        {
          test: /\.css$/i,
          use: [
            isEnvProduction && MiniCssExtractPlugin.loader,
            isEnvDevelopment && "style-loader",
            "css-loader",
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  ident: "postcss",
                  config: false,
                  plugins: [
                    "postcss-flexbugs-fixes",
                    [
                      "postcss-preset-env",
                      {
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      },
                    ],
                    "postcss-normalize",
                  ],
                },
                sourceMap: isEnvProduction
                  ? shouldUseSourceMap
                  : isEnvDevelopment,
              },
            },
          ].filter(Boolean),
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4 * 1024, // 4kb以下转base64
                name: `${assetsDir}/image/[name].[hash].[ext]`, // 文件名格式
              },
            },
          ],
        },
        {
          test: /\.md$/,
          use: "raw-loader",
        },
      ].filter(Boolean),
    },
    resolve: {
      alias: {
        "@": resolveApp("src"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    },
    performance: { hints: false },
    infrastructureLogging: {
      level: "none", // 禁用日志
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),

      // 设置环境变量
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(webpackEnv),
          REACT_APP_WEBSITE_NAME: JSON.stringify(env.APP_NAME),
          // 是否开启 mockapi
          REACT_APP_MOCK: env.REACT_APP_MOCK,
          // 打包时间（启动时间）
          REACT_APP_Build_Date: JSON.stringify(
            dayjs().format("YYYY-MM-DD HH:mm:ss")
          ),
          // commitHash
          REACT_APP_Commit_Hash: JSON.stringify(
            child_process.execSync("git show -s --format=%H").toString().trim()
          ),
          // 部署路径
          PUBLIC_PATH: JSON.stringify(env.PUBLIC_PATH),
        },
      }),

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

      // 向 index.html 中设置环境变量
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        REACT_APP_WEBSITE_NAME: env.APP_NAME,
        PUBLIC_URL: env.PUBLIC_PATH.slice(0, -1),
      }),

      // 执行eslint校验
      new ESLintPlugin({
        extensions: ["js", "jsx", "ts", "tsx", "json"],
      }),

      // 打印编译进度
      new webpack.ProgressPlugin(),

      // 将css提取到单独的文件中
      isEnvProduction &&
        new MiniCssExtractPlugin({
          filename: `${assetsDir}/css/[name].[contenthash:8].css`,
          chunkFilename: `${assetsDir}/css/[name].[contenthash:8].chunk.css`,
        }),

      // 生产环境可开启快速热更新
      isEnvDevelopment &&
        shouldUseReactRefresh &&
        new ReactRefreshWebpackPlugin({
          overlay: false,
        }),

      new CopyPlugin({
        patterns: [
          {
            from: resolveApp("public").replace(/\\/g, "/"),
            toType: "dir",
            noErrorOnMissing: true,
            globOptions: {
              ignore: [resolveApp("public/index.html").replace(/\\/g, "/")],
            },
            info: { minimized: true },
          },
        ],
      }),
    ].filter(Boolean),
    experiments: {
      topLevelAwait: true,
    },
  };
};
