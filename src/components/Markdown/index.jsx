import React, { useState } from "react";
import { useMount, useBoolean } from "ahooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { selectTheme } from "@/store/system";
import { useSelector } from "react-redux";
import copy from "clipboard-copy";
import rehypeHighlight from "rehype-highlight"; // 代码块高亮插件
import "./github-markdown.css"; // GitHub Markdown 样式
import "./github-highlight.css"; // github hightlight 样式

const CopyCodeContainer = function () {
  const [copied, { setTrue, setFalse }] = useBoolean(false);
  return (
    <div className="zeroclipboard-container">
      <div
        className={`copy-code-btn ${copied && "copied"}`}
        onClick={(event) => {
          const codeContainerNode =
            event.currentTarget.closest(".code-container");
          const text =
            codeContainerNode.getElementsByTagName("pre")[0].innerText;
          copy(text).then(() => {
            setTrue();
            setTimeout(setFalse, 1500);
          });
        }}
      >
        {!copied ? (
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon"
          >
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            data-view-component="true"
            className="octicon color-fg-success"
          >
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
        )}
      </div>
    </div>
  );
};

const Markdown = ({ markdown }) => {
  const themeName = useSelector(selectTheme);

  const Pre = ({ children }) => {
    return (
      <div className="highlight code-container">
        <pre>{children}</pre>
        <CopyCodeContainer />
      </div>
    );
  };

  return (
    <div
      className="markdown-body"
      data-theme={themeName}
      style={{ padding: 24 }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        skipHtml={true} // 禁止 react-markdown 将 HTML 标签包裹在 <p> 元素内部
        components={{ pre: Pre }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

// 用于在给.md文件配置路由懒加载时使用
export const lazyMarkdown = (ctor) => {
  const MarkdownPage = function () {
    const [content, setContent] = useState("");

    useMount(() => {
      ctor().then((module) => {
        setContent(module.default);
      });
    });

    return <Markdown markdown={content} />;
  };

  return MarkdownPage;
};

export default Markdown;
