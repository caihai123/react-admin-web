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

使用 [@wooorm/starry-night](https://github.com/wooorm/starry-night) 让代码块高亮显示。

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Markdown from "react-markdown";
import rehypeStarryNight from "./rehype-starry-night";

const markdown = `
# Your markdown here
`;

ReactDOM.render(
  <Markdown
    rehypePlugins={[rehypeStarryNight]}
    skipHtml={true} // 禁止 react-markdown 将 HTML 标签包裹在 <p> 元素内部
  >
    {markdown}
  </ReactMarkdown>,
  document.querySelector("#content")
);
```