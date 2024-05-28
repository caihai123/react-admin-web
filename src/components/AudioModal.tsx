import { theme, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import ReactDOM from "react-dom/client";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";

type Props = {
  visible: boolean;
  audioSrc: string;
  name: string;
  onClose?: () => void;
};

const AudioModal = (props: Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Draggable bounds={"body"} handle=".drag-handler">
      <div
        style={{
          display: props.visible ? "block" : "none",
          width: 320,
          position: "fixed",
          top: 60,
          right: 0,
          borderRadius: 8,
          boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.1)",
          background: colorPrimary,
          zIndex: 999,
        }}
      >
        <div style={{ padding: "10px 14px 14px 14px" }}>
          <div
            className="drag-handler"
            style={{
              color: "#fff",
              fontSize: 16,
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "move",
              userSelect: "none",
            }}
          >
            <div className="audio-name ellipsis">{props.name}</div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => props.onClose?.()}
              style={{ color: "#fff" }}
              size="small"
            ></Button>
          </div>

          <audio
            src={props.audioSrc}
            controls
            autoPlay
            style={{ width: "100%" }}
          ></audio>
        </div>
      </div>
    </Draggable>
  );
};

let root: ReactDOM.Root | null;
let container: HTMLElement;

/** 函数式调用 会挂载到body下 重复调用时只会保留最后一个*/
const showAudioModal = function (src: Props["audioSrc"], name: Props["name"]) {
  if (!root) {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  }

  const handleClose = () => {
    root?.unmount();
    root = null;
    document.body.removeChild(container);
  };

  root.render(
    <AudioModal
      audioSrc={src}
      name={name}
      visible={true}
      onClose={() => handleClose()}
    />
  );
};

export default createCompoundedComponent(AudioModal, { showAudioModal });
