# useDomSize ✨

节点尺寸变化时执行回调

> `ahook` 中的 [useSize](https://ahooks.js.org/zh-CN/hooks/use-size) 和此类似，但它是直接返回 size

## 代码演示

useDomSize 可以接收 ref 参数

```jsx
import React, { useRef } from "react";
import useDomSize from "@/hooks/useDomSize";

export default () => {
  const ref = useRef(null);
  useDomSize(ref, ({ width, height }) => {
    // div 尺寸发生改变时执行
  });
  return <div ref={ref}></div>;
};
```

useDomSize 可以接收 dom

```jsx
import React, { useRef } from "react";
import useDomSize from "@/hooks/useDomSize";

export default () => {
  useDomSize(document.querySelector("body"), ({ width, height }) => {
    // body 尺寸发生改变时执行
  });
  return <div></div>;
};
```
