import { Card, Space } from "antd";
import { type ReactNode } from "react";

const flexStype = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

export type Props = {
  /** 页面标题 */
  title?: ReactNode;
  /**  工具栏 */
  actions?: ReactNode;
  /** 操作栏 */
  tools?: ReactNode;
  /** 其他，不存在时操作栏会放在和工具栏一行，以节省空间 */
  extra?: ReactNode;
  children?: ReactNode;
};

/**
 * 页容器
 */
export default function PageContainer(props: Props) {
  const { title, actions, tools, extra, children } = props;

  return (
    <Card>
      <div style={flexStype}>
        {typeof title === "string" ? (
          <h1 style={{ margin: 0 }}>{title} ✨</h1>
        ) : (
          title
        )}

        <Space>
          {!extra && actions}

          {tools}
        </Space>
      </div>

      {extra && (
        <div style={flexStype}>
          <div>{extra}</div>
          <div>{actions}</div>
        </div>
      )}

      <div>{children}</div>
    </Card>
  );
}
