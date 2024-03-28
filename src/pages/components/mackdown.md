# markdown 演示页面

使用 [react-markdown](https://github.com/remarkjs/react-markdown) 组件实现。

## 这用来做什么？

未来我可能在本项目中编写很多文档页面，就想本页面一样，我希望可以用 `markdown` 文件来编写，而不是使用常规的页面开发方式。

## 怎么使用？

在本该创建页面组件的地方创建`.md`文件，在里面编写内容，然后在配置路由时使用 `Markdown` 组件包装。

```js
import { createBrowserRouter } from "react-router-dom";
import Markdown from "@/components/Markdown";
import mackdown from "@/pages/components/mackdown.md";

const router = createBrowserRouter([
  //...
  {
    path: "/markdown",
    element: <Markdown markdown={mackdown}></Markdown>,
  },
  //...
]);

export default router;
```

## Github 风格的 markdown 主题

[react-markdown](https://github.com/remarkjs/react-markdown) 组件只会帮助你将 markdown 字符转为 html 展示，并不会控制样式。我这里使用了[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)，我做了一点简单的改动，以适应本系统的主题切换功能。

## 语法高亮

以下是突出显示代码的插件示例：[rehype-highlight](https://github.com/rehypejs/rehype-highlight)。

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = `
# Your markdown here
`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
```

> 本来之前打算使用 [@wooorm/starry-night](https://github.com/wooorm/starry-night) 的，因为它能更好的复用 `github-markdown-css`，但是无奈因为它异步的原因并不能很好的支持 `react-markdown` （详情可以点击 [这里](https://github.com/remarkjs/react-markdown/issues/680) 查看），虽然也可以使用一些手段达到效果，但是它异步加载的资源地址可能对国内的网络也不是很友好，另外它官网也说它太重，不太建议在浏览器运行，所以就果断抛弃了。