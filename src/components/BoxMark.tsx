import { useBoolean, useMount } from "ahooks";
import { theme } from "antd";
import { EyeOutlined } from "@ant-design/icons";

import type { ReactNode, CSSProperties } from "react";

type Props = {
  children?: ReactNode;
  /** 蒙层上的内容 默认【预览】 */
  content?: ReactNode;
  zIndex: number;
  onClick?: () => void;
  trigger: "hover" | "always";
  style: CSSProperties;
};

/** 给 Dom 添加蒙层 */
export default function BoxMark(props: Props) {
  const {
    token: { colorBgMask, colorWhite },
  } = theme.useToken();

  const {
    zIndex = 9,
    trigger = "hover",
    content = (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colorWhite,
        }}
      >
        <EyeOutlined style={{ marginRight: 4 }} />
        预览
      </div>
    ),
  } = props;

  const [show, { set: setShow }] = useBoolean(false);

  useMount(() => {
    if (trigger === "always") setShow(true);
  });

  const watermarkStyle: CSSProperties = {
    zIndex,
    position: "absolute",
    left: "0px",
    top: "0px",
    width: "100%",
    height: "100%",
    cursor: props.onClick ? "pointer" : "auto",
    background: colorBgMask,
    opacity: show ? 1 : 0,
    transition: "opacity 0.3s",
  };

  return (
    <div
      style={{ position: "relative", ...props.style }}
      onMouseOver={() => {
        if (trigger === "hover") setShow(true);
      }}
      onMouseOut={() => {
        if (trigger === "hover") setShow(false);
      }}
      onClick={props.onClick}
    >
      {props.children}
      <div style={watermarkStyle}>{content}</div>
    </div>
  );
}
