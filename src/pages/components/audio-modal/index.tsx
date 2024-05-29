import { useState } from "react";
import { Card, Button } from "antd";
import AudioModal from "@/components/AudioModal";
import Markdown from "@/components/Markdown";
import doc from "./doc.md";

export default function AudioPage() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card>
        <Button type="primary" onClick={() => setVisible(true)}>
          点击播放音乐
        </Button>

        <AudioModal
          visible={visible}
          name="音乐名称.mp3"
          src="http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3"
          onClose={() => setVisible(false)}
        />
      </Card>
      <Markdown markdown={doc} />
    </>
  );
}
