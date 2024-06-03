import { theme } from "antd";

import type { CSSProperties } from "react";

export default function useBoxStyle() {
  const {
    token: { colorPrimary, colorWhite },
  } = theme.useToken();

  const transitionBoxStyle: CSSProperties = {
    width: 200,
    height: 100,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
    padding: 20,
    textAlign: "center",
    borderRadius: 4,
    boxSizing: "border-box",
    color: colorWhite,
    fontSize: 16,
    background: colorPrimary,
  };

  return transitionBoxStyle;
}
