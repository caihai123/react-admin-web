# react-admin-web

```bash
# 安装依赖，不要用 cnpm或者yarn 安装
npm install
# or
npm i --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm start
# or
npm run dev

# 部署打包
npm run build

# 代码修复
npm run lint
```

>项目中的所有代码都需要通过 [ESLint](https://eslint.bootcss.com/) 的检测，为了保持更好的开发体验，建议在 vscode 中安装 ESLint 和 Prettier 插件并添加以下配置：
`
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
`