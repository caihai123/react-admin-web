import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight"; // 代码块高亮插件
import "@/assets/github-markdown.css"; // GitHub Markdown 样式
import "@/assets/github-highlight.css"; // github highlight 样式
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";

const MarkdownPreview = ({ markdown }) => {
  const themeName = useSelector(selectTheme);

  return (
    <div
      className="markdown-body"
      data-theme={themeName}
      style={{ padding: 24 }}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        skipHtml={true} // 禁止 react-markdown 将 HTML 标签包裹在 <p> 元素内部
      >
        {markdown}
      </Markdown>
    </div>
  );
};

export default MarkdownPreview;
