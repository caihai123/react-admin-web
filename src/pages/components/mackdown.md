# 一个演示 `markdown`

使用 [react-markdown](https://github.com/remarkjs/react-markdown) 组件渲染。

## Github 风格的 markdown 主题

`react-markdown` 组件只会帮助你将 markdown 字符转为 html 展示，并不会控制样式。我这里使用了[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)，用最少的 CSS 复制 GitHub Markdown 风格。

## 语法高亮

这是一个用于突出显示代码的插件示例： [@wooorm/starry-night](https://github.com/wooorm/starry-night)。

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