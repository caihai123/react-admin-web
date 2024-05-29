# VideoModal
视频播放器组件

## 代码演示
```tsx
import { useState } from "react";
import { Button } from "antd";
import VideoModal from "@/components/VideoModal";

export default function AudioPage() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        点击播放视频
      </Button>

      <VideoModal
        visible={visible}
        src="https://media.w3.org/2010/05/sintel/trailer.mp4"
        onClose={() => setVisible(false)}
      />
    </div>
  );
}
```

## 推荐使用 `showModal` 
就像普通 `Modal` 一样，`VideoModal` 总是会在 `body` 下创建节点，并且它不应该同时存在多个实例，所以我认为使用 `showModal` 调用才是合理的编码方式。
```tsx
import { Button } from "antd";
import VideoModal from "@/components/VideoModal";

export default function PlayAudio() {
  return (
    <Button
      onClick={() =>
        VideoModal.showModal("https://media.w3.org/2010/05/sintel/trailer.mp4")
      }
    >
      点击播放视频
    </Button>
  );
}

```