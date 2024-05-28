import { Image } from "antd";
import MyIcon from "@/components/CustomIcon";
import AudioModal from "@/components/AudioModal";
import VideoModal from "@/components/VideoModal";
import { getFilenameFromPath } from "@/utils/utils";

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
        <MyIcon
          type="icon-file_video"
          style={{ fontSize: height }}
          onClick={() => VideoModal.showModal(src)}
        />
      );
    case "audio":
      // 音频
      return (
        <MyIcon
          type="icon-file_music"
          style={{ fontSize: height }}
          onClick={() =>
            AudioModal.showAudioModal(src, getFilenameFromPath(src))
          }
        />
      );
    default:
      return <MyIcon type="icon-File" style={{ fontSize: height }} />;
  }
}
