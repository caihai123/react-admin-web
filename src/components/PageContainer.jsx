import { Card, Space } from "antd";

const flexStype = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
};

/**
 * 页容器
 * @param {*} title 页面标题
 * @param {*} tools 工具栏
 * @param {*} actions 操作栏
 * @param {*} extra 其他，不存在时操作栏会放在和工具栏一行，以节省空间
 */
export default function PageContainer(props) {
  const { title, actions, tools, extra } = props;

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

      <div>{props.children}</div>
    </Card>
  );
}
