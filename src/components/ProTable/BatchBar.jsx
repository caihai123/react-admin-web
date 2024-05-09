import { Space, Button, theme } from "antd";
import styles from "./style.module.css";

/**
 * 批量操作栏
 * @param {*} props
 * @returns
 */
export default function BatchBar(props) {
  const { batchBarRender, selectedRowKeys, setSelectedRowKeys } = props;
  const {
    token: { borderRadius, controlItemBgActive, colorText },
  } = theme.useToken();

  return (
    batchBarRender && (
      <div
        className={styles["batch-bar"]}
        style={{
          display: selectedRowKeys.length > 0 ? "" : "none",
          color: colorText,
          backgroundColor: controlItemBgActive,
          borderRadius,
        }}
      >
        <div>
          <span>已选 {selectedRowKeys.length} 项</span>
          <Button type="link" onClick={() => setSelectedRowKeys([])}>
            取消选择
          </Button>
        </div>
        <Space>
          {typeof batchBarRender === "function"
            ? batchBarRender(selectedRowKeys)
            : batchBarRender}
        </Space>
      </div>
    )
  );
}
