import { Image } from "antd";
import MyIcon from "@/components/CustomIcon";
import AudioModal from "@/components/AudioModal";
import VideoModal from "@/components/VideoModal";
import BoxMark from "@/components/BoxMark";

export default function FileView(props) {
  const { src, type, height } = props;

  switch (type) {
    case "img":
      // 图片
      return <Image src={src} height={height} preview={true} />;
    case "doc":
      // 文档
      return <MyIcon type="icon-file_txt" style={{ fontSize: height }} />;
    case "video":
      // 视频
      return (
        <BoxMark
          onClick={() => VideoModal.showModal(src)}
          style={{ display: "inline-block" }}
        >
          <MyIcon type="icon-file_video" style={{ fontSize: height }} />
        </BoxMark>
      );
    case "audio":
      // 音频
      return (
        <BoxMark
          onClick={() => AudioModal.showAudioModal(src)}
          style={{ display: "inline-block" }}
        >
          <MyIcon type="icon-file_music" style={{ fontSize: height }} />
        </BoxMark>
      );
    default:
      return <MyIcon type="icon-File" style={{ fontSize: height }} />;
  }
}
