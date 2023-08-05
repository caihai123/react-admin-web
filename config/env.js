module.exports = {
  // 应用名称
  APP_NAME: "React Or Antd",

  //部署应用包时的基本 URL，只支持绝对路径，我没有做容错处理，需要严格保持以'/'开头和结尾，一般情况下设置为'/'。
  PUBLIC_PATH: "/react-admin-web/",

  // 是否开启 mockapi
  REACT_APP_MOCK: true,

  // 是否在 development 环境开启热更新
  FAST_REFRESH: true,

  // 默认值：8080
  PORT: 8080,

  // 是否以https模式运行开发服务器。
  HTTPS: true,

  // 是否开启源映射文件
  GENERATE_SOURCEMAP: true,
};
