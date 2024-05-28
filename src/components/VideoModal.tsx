import { Modal } from "antd";
import ReactDOM from "react-dom/client";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";

type Props = {
  visible: boolean;
  url: string;
  onClose?: () => void;
  width?: number | string;
  height?: number | string;
  autoPlay?: boolean;
};

const VideoModal = function (props: Props) {
  const { width = 800, height, autoPlay = true } = props;

  return (
    <Modal
      open={props.visible}
      onCancel={props.onClose}
      footer={null}
      centered
      width={width}
      closeIcon={false}
    >
      <video
        width="100%"
        height={height}
        autoPlay={autoPlay}
        controls
        src={props.url}
      ></video>
    </Modal>
  );
};

let root: ReactDOM.Root | null;

/** 函数式调用 会挂载到body下 重复调用时只会保留最后一个*/
const showModal = function (src: Props["url"]) {
  if (!root) {
    const container = document.createDocumentFragment();
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  }

  const handleClose = () => {
    root?.render(<VideoModal url={src} visible={false} />);
  };

  root.render(
    <VideoModal url={src} visible={true} onClose={() => handleClose()} />
  );
};

export default createCompoundedComponent(VideoModal, { showModal });
