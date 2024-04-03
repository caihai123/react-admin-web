# react-admin-web

## 介绍
本项目是一个后台前端开发模板，他是基于 React18 和 Ant Design 5 实现，它使用了最新的技术栈，内置了路由权限验证，动态换肤等功能，可以帮助你快速搭建企业级中后台产品原型。

简单来说，本项目就是已经搭建好的前端项目，内置一个有权限控制的简单的`layout`。如果你正好需要一个可快速开发，便于修改和理解的前端模版，那么它一定是一个很好的选择。

## 目录结构

```
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── config                     # 
│   │── devServer.js           # 本地开发服务配置
│   └── env.js                 # 全局变量
│   └── webpack.config.js      # webpack 配置
├── scripts                    # 
│   │── build.js               # 生产打包命令
│   └── start.js               # 本地启动命令
├── src                        # 源代码
│   ├── assets                 # 图片，文件等静态资源
│   ├── components             # 全局公用组件
│   ├── hooks                  # 全局hooks
│   ├── layout                 # 全局 layout
│   ├── mock                   # 模拟api接接口
│   ├── pages                  # 业务相关页面
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── App.js                 # 入口组件
│   ├── console.js             # 在浏览器控制台打印基本信息
│   ├── index.css              # 全局css
│   └── index.js               # 入口js
├── .browserslistrc            # 配置兼容浏览器
├── .eslintrc.js               # ESLint规则
├── .gitignore                 # git忽略文件配置
├── .prettierrc.js             # prettier配置
├── package-lock.json          # 依赖版本描述文件
├── package.json               # package.json
├── README.md                  # 项目描述文件
└── gh-pages.js                # 打包部署到github上的代码，你应该不需要他
```

## 安装
```
# 克隆项目
git clone https://github.com/caihai123/react-admin-web.git
# or 
git clone https://gitee.com/caihai123/react-admin-web.git

# 进入项目目录
cd react-admin-web

# 安装依赖，不要用 cnpm或者yarn 安装
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

## 菜单权限
菜单权限控制算是本项目的核心功能，也算是一个大部分系统都需要的基本功能。我先说一下本项目的实现思路：
1. 创建页面 当我们每新增一个页面时，我们需要在 `菜单管理` 下进行录入一次，相当于告诉后端我们前端现在又有了一个页面，包括菜单的title,path,icon等基本信息。
2. 配置权限 到 `角色管理` 下将刚才创建的菜单分配给你希望的角色。
3. 获取菜单列表 当拥有某个或某些角色的用户进入 `layout` 下面的页面后，会发送请求菜单列表（权限路由树）的请求，渲染侧边菜单栏并将菜单列表存储在 `redux` 中。（如果接口返回401，则跳转到登录页）
4. 鉴权 在`RouteAuth`组件中，获取存储在 `redux` 在中的路由表进行判断（当前的判断逻辑为当前地址的页面是否在后端返回的路由表中），如果有权限，则正常显示，否则则显示401。（如果接口失败则显示500）

```jsx
// RouteAuth
import { Result } from "antd";
import { useSelector } from "react-redux";
import { selectMenu, selectMenuFlatten } from "@/store/menu";
import { useLocation } from "react-router-dom";
import Error401 from "@/pages/401";
import PageLoading from "./PageLoading";

// 权限路由包装组件
// 根据后端返回的菜单列表显示视图
export default function Auth(props) {
  const { pathname } = useLocation();
  const { status } = useSelector(selectMenu);
  const menuFlatten = useSelector(selectMenuFlatten);

  const component = {
    loading: <PageLoading />,
    succeeded: menuFlatten.some((item) => item.path === pathname) ? (
      <props.Component />
    ) : (
      <Error401 />
    ),
    failed: (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Result
          status="500"
          title="权限错误！！！"
          subTitle="没有获取到您的权限，可能是菜单获取失败了，您可以尝试刷新整个页面。"
        ></Result>
      </div>
    ),
  };

  return component[status];
}

```

> 在上面的方案中，我们非常依赖后端同事的配合，有时候后端同事并不是很愿意，甚至我们前端也可能不希望将菜单交于后端管理，所以还有另一种方案：后端只需要告诉我当前用户是哪类（角色），然后前端直接就能判断对应的菜单列表和权限。这种在操作上比较简单，也不需要后端人员太多配合，但是它必须在编码的时候就定下所有的角色类型和每个角色的权限，后续的可配置性太低。[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 好像就是这样（其实我觉得这样才是对的，任何一个系统，在设计之初就应该预想出可能的角色类型，不应该需要这么灵活的配置）

## Mockjs
本项目是一个纯前端个人项目，所有的数据都是用 mockjs 模拟生成。它的原理是: 拦截了所有的请求并代理到本地，然后进行数据模拟，所以你会发现 network 中没有发出任何的请求。

## 暗黑模式
在 5.0 版本的 Ant Design 中，我们可以轻易的使用动态切换主题切换功能。详情参考：https://ant-design.antgroup.com/docs/react/customize-theme-cn

## webpack 配置
本项目不是基于 [Create React App](https://create-react-app.dev/) 等快速启动项目的工具搭建了。当然也参考了部分 `Create React App` 和 `vue-cli` 的代码。具体代码可参考项目中的 `config` 和 `script` 文件夹。

## Eslint 和 Prettier
为了保持更好的开发体验，项目已经集成了 Eslint 和 Prettier 进行代码检查，同时也配置的一些基础的检验规则，如有需要可自行在 `.eslintrc.js` 和 `.prettierrc.js` 中按需要自行调整。