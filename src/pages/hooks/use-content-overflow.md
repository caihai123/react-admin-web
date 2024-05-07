# useContentOverflow ✨

检测内容是否溢出

## 代码演示

检测向右溢出

```jsx
import { useRef } from "react";
import useContentOverflow from "@/hooks/useContentOverflow";

export default function ContentOverflowDetector() {
  const containerRef = useRef(null);

  const { isOverflowX } = useContentOverflow(containerRef);

  return (
    <div
      ref={containerRef}
      className="ellipsis"
      style={{ width: 100, height: 100 }}
      title={isOverflowX ? "内容溢出了" : "内容没有溢出"}
    >
      这里有很多很多很多很多很多很多很多很多很多很多很多很多内容
    </div>
  );
}
```

检测向下溢出

```jsx
import { useRef } from "react";
import useContentOverflow from "@/hooks/useContentOverflow";

export default function ContentOverflowDetector() {
  const containerRef = useRef(null);

  const { isOverflowY } = useContentOverflow(containerRef);

  return (
    <div
      ref={containerRef}
      style={{ width: 100, height: 100 }}
      title={isOverflowY ? "内容向下溢出了" : "内容没有溢出"}
    >
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
      <p>内容</p>
    </div>
  );
}
```

## Params

| 参数   | 说明             | 默认值 |
| ------ | ---------------- | ------ |
| target | DOM 节点或者 ref | -      |

## Result

| 参数        | 说明         | 默认值 |
| ----------- | ------------ | ------ |
| isOverflowX | 是否向右溢出 | -      |
| isOverflowY | 是否向下溢出 | -      |
