import { useState } from "react";
import DropdownFrom from "@/components/DropdownFrom";
import { Table, Form, Select, Input, Space } from "antd";
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
    return <Input placeholder={`请填写${item.title}`} />;
  }
};

const ProTable = function (props) {
  const [params, setParams] = useState();

  const { data: tableData, pagination } = usePagination(
    ({ current, pageSize }) => props.request(params, { current, pageSize }),
    { refreshDeps: [params] }
  );

  const { toolBarRender = null, headerTitle } = props;

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
        <div className={styles["tools"]}>
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
          bordered
        />
      </div>
    </div>
  );
};

export default ProTable;
