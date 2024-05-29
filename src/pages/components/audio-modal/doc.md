# AudioModal
音乐播放器组件

## 代码演示
```tsx
import { useState } from "react";
import { Button } from "antd";
import AudioModal from "@/components/AudioModal";

export default function AudioPage() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>点击播放音乐</Button>

      <AudioModal
        visible={visible}
        name="音乐名称.mp3"
        audioSrc="http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3"
        onClose={() => setVisible(false)}
      />
    </div>
  );
}

```

## 推荐使用 `showModal` 
就像普通 `Modal` 一样，`AudioModal` 总是会在 `body` 下创建节点，并且它不应该同时存在多个实例，所以我认为使用 `showModal` 调用才是合理的编码方式。
```tsx
import { Button } from "antd";
import AudioModal from "@/components/AudioModal";

export default function PlayAudio() {
  return (
    <Button
      onClick={() =>
        AudioModal.showModal(
          "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3",
          "音乐名称.mp3"
        )
      }
    >
      点击播放
    </Button>
  );
}
```