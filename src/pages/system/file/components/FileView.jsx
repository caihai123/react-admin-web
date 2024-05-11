import { Image } from "antd";
import MyIcon from "@/components/CustomIcon";

export default function FileView(props) {
  const { src, type, height } = props;

  switch (type) {
    case "img":
      // 图片
      return <Image src={src} height={height} preview={false} />;
    case "doc":
      // 文档
      return <MyIcon type="icon-file_txt" style={{ fontSize: height }} />;
    case "video":
      // 视频
      return <MyIcon type="icon-file_video" style={{ fontSize: height }} />;
    case "music":
      // 音频
      return <MyIcon type="icon-file_music" style={{ fontSize: height }} />;
    default:
      return <MyIcon type="icon-File" style={{ fontSize: height }} />;
  }
}
