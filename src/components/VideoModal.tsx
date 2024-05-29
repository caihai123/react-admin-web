import { useState } from "react";
import { Image, Result, theme } from "antd";
import ReactDOM from "react-dom/client";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";

type Props = {
  visible: boolean;
  url: string;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  autoPlay?: boolean;
  afterClose?: () => void;
};

const VideoModal = function (props: Props) {
  const { width = 800, height, autoPlay = true } = props;

  const [error, setError] = useState<boolean>(false);

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Image
      style={{ display: "none" }}
      preview={{
        visible: props.visible,
        destroyOnClose: true,
        imageRender: () => {
          if (error) {
            return (
              <Result
                status="error"
                title="视频不能正常播放！"
                subTitle="The video doesn't play properly!"
                style={{ width, background: colorBgLayout }}
              ></Result>
            );
          } else {
            return (
              <video
                width={width}
                height={height}
                autoPlay={autoPlay}
                controls
                src={props.url}
                onError={() => setError(true)}
                onPlay={() => setError(false)}
              ></video>
            );
          }
        },
        toolbarRender: () => null,
        onVisibleChange: () => {
          props.onClose?.();
        },
      }}
    />
  );
};

let root: ReactDOM.Root | null;
let uuid: number = 1;

/** 函数式调用 会挂载到body下 重复调用时只会保留最后一个*/
const showModal = function (src: Props["url"]) {
  uuid++;
  if (!root) {
    const container = document.createDocumentFragment();
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  }

  const handleClose = () => {
    root?.render(<VideoModal key={uuid} url={src} visible={false} />);
  };

  root.render(
    <VideoModal
      url={src}
      key={uuid}
      visible={true}
      onClose={() => handleClose()}
    />
  );
};

export default createCompoundedComponent(VideoModal, { showModal });
