import { useRef } from "react";
import { theme, Button } from "antd";
import {
  CloseOutlined,
  AudioFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Draggable from "react-draggable";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import { useBoolean } from "ahooks";
import { getFilenameFromPath } from "@/utils/utils";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

const AudioBox = styled.div`
  width: 320px;
  border-radius: 8px;
  padding: 10px 14px 14px 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  & > .drag-handler {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
    cursor: move;
    user-select: none;
  }
  &.zoom-in-top-enter {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-enter-active {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
  &.zoom-in-top-exit {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
  &.zoom-in-top-exit-active {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-appear {
    opacity: 0;
    transform: scaleY(0);
  }
  &.zoom-in-top-appear-active {
    opacity: 1;
    transform: scaleY(1);
    transition: opacity 300ms, transform 300ms;
    transform-origin: top;
  }
`;

type Props = {
  visible: boolean;
  src: string;
  name?: string;
  onClose?: () => void;
};

const AudioModal = (props: Props) => {
  const {
    token: { colorPrimary, colorError },
  } = theme.useToken();

  const [error, { set: setError }] = useBoolean(false);

  const nodeRef = useRef(null);

  return createPortal(
    <Draggable bounds={"body"} handle=".drag-handler">
      <div
        className={`video-modal`}
        style={{
          position: "fixed",
          top: 60,
          right: 0,
          zIndex: 999,
        }}
      >
        <CSSTransition
          in={props.visible}
          nodeRef={nodeRef}
          timeout={300}
          unmountOnExit
          classNames="zoom-in-top"
          appear
        >
          <AudioBox
            ref={nodeRef}
            style={{
              background: colorPrimary,
            }}
          >
            <div className="drag-handler">
              <div
                className="audio-name ellipsis"
                style={{ color: error ? colorError : "" }}
              >
                {error ? (
                  <ExclamationCircleFilled style={{ marginRight: 8 }} />
                ) : (
                  <AudioFilled style={{ marginRight: 8 }} />
                )}
                {!props.name ? getFilenameFromPath(props.src) : props.name}
              </div>

              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => props.onClose?.()}
                style={{ color: "#fff" }}
                size="small"
              ></Button>
            </div>

            <audio
              src={props.src}
              controls
              autoPlay
              style={{ width: "100%" }}
              onError={() => setError(true)}
              onPlay={() => setError(false)}
            ></audio>
          </AudioBox>
        </CSSTransition>
      </div>
    </Draggable>,
    document.body
  );
};

let root: ReactDOM.Root | null;

/** 函数式调用 会挂载到body下 重复调用时只会保留最后一个*/
const showModal = function (src: Props["src"], name?: Props["name"]) {
  if (!root) {
    const container = document.createDocumentFragment();
    document.body.appendChild(container);
    root = ReactDOM.createRoot(container);
  }

  const handleClose = () => {
    root?.render(<AudioModal src={src} name={name} visible={false} />);
    setTimeout(() => {
      root?.unmount();
      root = null;
    }, 350);
  };

  root.render(
    <AudioModal
      src={src}
      name={name}
      visible={true}
      onClose={() => handleClose()}
    />
  );
};

export default createCompoundedComponent(AudioModal, { showModal });
