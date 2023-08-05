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

## Eslint 和 Prettier

## 最后
>项目中的所有代码都需要通过 [ESLint](https://eslint.bootcss.com/) 的检测，为了保持更好的开发体验，建议在 vscode 中安装 ESLint 和 Prettier 插件并添加以下配置：
`
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
`