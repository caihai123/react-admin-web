import { useState } from "react";
import { Card, Button } from "antd";
import VideoModal from "@/components/VideoModal";
import Markdown from "@/components/Markdown";
import doc from "./doc.md";

export default function AudioPage() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card>
        <Button type="primary" onClick={() => setVisible(true)}>
          点击播放视频
        </Button>

        <VideoModal
          visible={visible}
          src="https://media.w3.org/2010/05/sintel/trailer.mp4"
          onClose={() => setVisible(false)}
        />
      </Card>
      <Markdown markdown={doc} />
    </>
  );
}
