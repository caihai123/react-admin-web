import { theme, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Draggable from "react-draggable";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
      transform: scaleY(0);
      opacity: 0;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
      transform: scaleY(1);
      opacity: 1;
    }
    to {
      transform: scaleY(0);
      opacity: 0;
    }
`;

const AudioModalStyled = styled.div`
  display: none;
  &.show {
    display: block;
    animation: ${fadeIn} 0.3s forwards;
    transform-origin: top;
  }
  &.hide {
    display: block;
    animation: ${fadeOut} 0.3s forwards;
    transform-origin: top;
  }
`;

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

  return createPortal(
    <div className={`video-modal`}>
      <Draggable bounds={"body"} handle=".drag-handler">
        <AudioModalStyled
          className={props.visible ? "show" : "hide"}
          style={{
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
        </AudioModalStyled>
      </Draggable>
    </div>,
    document.body
  );
};

let root: ReactDOM.Root | null;

/** 函数式调用 会挂载到body下 重复调用时只会保留最后一个*/
const showAudioModal = function (src: Props["audioSrc"], name: Props["name"]) {
  if (!root) {
    const container = document.createDocumentFragment();
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  }

  const handleClose = () => {
    root?.render(<AudioModal audioSrc={src} name={name} visible={false} />);
    setTimeout(() => {
      root?.unmount();
      root = null;
    }, 350);
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
