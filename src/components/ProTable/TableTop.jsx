import { theme, Tooltip, Dropdown } from "antd";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ColumnSetting from "./ColumnSetting";
import styles from "./style.module.css";

/** 表格头部 */
export default function TableTop(props) {
  const {
    // 标题，因为要向外传递参数，所以让外面处理好再传进来
    tableTitle,

    // 点击刷新时
    onRefresh,

    // table size 默认值
    initialTableSize,
    // table size 改变时
    onTableSizeChange,

    // 列筛选 当前选中项 array
    columnSettingValue,
    // 列筛选 options
    columnSettingOptions,
    // 列筛选 改变时
    onColumnSettingChange,
    //
    toolBarRender,
    style,
  } = props;

  const {
    token: { borderRadius, colorText, colorBgContainer },
  } = theme.useToken();

  return (
    <div
      className={styles["tools-bar"]}
      style={{
        ...style,
        color: colorText,
        backgroundColor: colorBgContainer,
        borderRadius,
      }}
    >
      <div className={styles["header-title"]}>{tableTitle}</div>
      <div className={styles["tool-right"]}>
        {toolBarRender}
        <div className={styles["toolbar-setting"]}>
          <div className={styles["toolbar-setting-item"]} onClick={onRefresh}>
            <Tooltip title="刷新">
              <ReloadOutlined />
            </Tooltip>
          </div>
          <Dropdown
            overlayStyle={{ width: 80 }}
            menu={{
              items: [
                { key: "large", label: "默认" },
                { key: "middle", label: "中等" },
                { key: "small", label: "紧凑" },
              ],
              selectable: true,
              defaultSelectedKeys: [initialTableSize],
              onClick: ({ key }) => onTableSizeChange(key),
            }}
            trigger={["click"]}
          >
            <div className={styles["toolbar-setting-item"]}>
              <Tooltip title="密度">
                <ColumnHeightOutlined />
              </Tooltip>
            </div>
          </Dropdown>

          <ColumnSetting
            value={columnSettingValue}
            options={columnSettingOptions}
            onChange={(keys) => onColumnSettingChange(keys)}
          >
            <div className={styles["toolbar-setting-item"]}>
              <Tooltip title="列设置">
                <SettingOutlined />
              </Tooltip>
            </div>
          </ColumnSetting>
        </div>
      </div>
    </div>
  );
}
