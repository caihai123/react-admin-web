# react-admin-web

## 介绍

本项目是一个后台前端开发模板，他是基于 React18 和 Ant Design 5 实现，它使用了最新的技术栈，内置了动态路由，权限验证，动态换肤等功能，可以帮助你快速搭建企业级中后台产品原型。
+ [在线预览](https://caihai123.com/react-admin-web/)
+ [Gitee在线预览](https://caihai123.gitee.io/react-admin-web/)

## 安装和运行
```
# 克隆项目到本地：
git clone https://github.com/caihai123/react-admin-web.git
cd react-admin-web

# 安装依赖：
npm install 
# or 
npm i --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev

# 构建打包
npm run build

# 代码修复
npm run lint
```

## webpack 
本项目不是基于 [Create React App](https://create-react-app.dev/) 等快速启动项目的工具搭建了。当然也参考了部分 `Create React App` 和 `vue-cli` 的代码。具体代码可参考项目中的 `config` 和 `script` 文件夹。

## Eslint 和 Prettier
 为了保持更好的开发体验，项目已经集成了 Eslint 和 Prettier 进行代码检查，同时也配置的一些基础的检验规则，如有需要可自行在 `.eslintrc.js` 和 `.prettierrc.js` 中按需要自行调整。