import { useState } from "react";
import DropdownFrom from "@/components/DropdownFrom";
import { Table, Form, Select, Input, Space, Button, theme } from "antd";
import styles from "./style.module.css";
import { usePagination } from "ahooks";

// 生成输入框
const createInput = function (item) {
  if (item.type === "select") {
    return (
      <Select
        placeholder={`请选择${item.title}`}
        options={item.options}
        style={{ width: "183px" }}
      />
    );
  } else {
    return <Input placeholder={`请输入${item.title}`} />;
  }
};

const ProTable = function (props) {
  const [params, setParams] = useState();

  const { data: tableData, pagination } = usePagination(
    ({ current, pageSize }) => props.request(params, { current, pageSize }),
    { refreshDeps: [params] }
  );

  const {
    // 工具栏渲染函数
    toolBarRender = null,

    // 列表标题区渲染函数
    headerTitle,

    // 批量操作功能的渲染函数，不为空时会自动配置checkbox
    batchBarRender = null,

    // 表格的rowSelection配置项，优先级最高，可能会覆盖掉
    tableRowSelection = {},
  } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 当前选中的keys

  const {
    token: { borderRadius, controlItemBgActive, colorText },
  } = theme.useToken();

  return (
    <div style={{ padding: 20 }}>
      <div className={styles["query"]}>
        <DropdownFrom onFinish={(values) => setParams(values)}>
          {props.columns
            .filter((item) => item.hideInSearch !== true)
            .map((item) => (
              <Form.Item
                label={item.title}
                name={item.dataIndex}
                key={item.key || item.dataIndex}
              >
                {createInput(item)}
              </Form.Item>
            ))}
        </DropdownFrom>
      </div>

      {toolBarRender ? (
        <div
          className={styles["tools"]}
          style={{
            display: selectedRowKeys.length > 0 ? "none" : "",
            color: colorText,
          }}
        >
          <div className={styles["header-title"]}>
            {typeof headerTitle === "function" ? headerTitle() : headerTitle}
          </div>
          <Space>
            {typeof toolBarRender === "function"
              ? toolBarRender()
              : toolBarRender}
          </Space>
        </div>
      ) : undefined}

      {batchBarRender ? (
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
      ) : undefined}

      <div className={styles["main"]}>
        <Table
          rowKey={props.rowKey}
          dataSource={tableData?.list}
          columns={props.columns.filter((item) => item.hideInTable !== true)}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条`,
            onChange: pagination.onChange,
          }}
          rowSelection={
            batchBarRender
              ? {
                  type: "checkbox",
                  selectedRowKeys,
                  onChange: (keys) => setSelectedRowKeys(keys),
                  ...tableRowSelection,
                }
              : undefined
          }
          bordered
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default ProTable;
