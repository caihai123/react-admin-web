import React, { useState } from "react";
import { useMount } from "ahooks";

const Markdown = React.lazy(() => import("./index.jsx"));

/**
 * 用于在给.md文件配置路由懒加载时使用
 * 本来我是写在index.jsx中的，但是这样Markdown组件就没有懒加载功能了，所以只能拆分成一个单独的文件
 */
export default function lazyMarkdown(ctor) {
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
}
