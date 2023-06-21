import { useState, useRef } from "react";
import { usePagination } from "ahooks";
import { Table, Form, Input, Select, Button, Space, Switch } from "antd";
import styles from "@/styles/table-page.module.css";
import useAxios from "@/hooks/axios";
import DropdownFrom from "@/components/DropdownFrom";

export default function Page() {
  const axios = useAxios();
  const columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "备注",
      dataIndex: "description",
    },
    {
      title: "状态",
      render: (row) => <Switch checked={row.status === 1} />,
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <Space>
          <Button type="primary" ghost size="small">
            编辑
          </Button>
          <Button type="primary" size="small">
            授权
          </Button>
          <Button type="primary" danger size="small">
            删除
          </Button>
        </Space>
      ),
      width: 100,
      fixed: "right",
    },
  ];

  const [params, setParams] = useState();
  const { data: tableData, pagination } = usePagination(
    ({ current, pageSize }) => {
      return axios
        .post("/api/role/page", {
          params,
          pageIndex: current,
          pageSize,
        })
        .then((value) => {
          const { result: data } = value;
          return {
            list: data.records,
            total: data.total,
          };
        });
    },
    {
      refreshDeps: [params],
    }
  );

  const addOrEditRef = useRef(null);

  return (
    <div style={{ padding: 20 }}>
      <div className={styles["page-head"]}>
        <DropdownFrom onFinish={(values) => setParams(values)}>
          <Form.Item label="角色名称" name="roleName">
            <Input placeholder="请输入角色名称" />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              placeholder="请选择状态"
              options={[
                { value: 1, label: "启用" },
                { value: 0, label: "禁用" },
              ]}
              style={{ width: 183 }}
            />
          </Form.Item>
        </DropdownFrom>
      </div>
      <div className={styles["page-tools"]}>
        <Button type="primary" onClick={() => addOrEditRef.current.onStart()}>
          新增
        </Button>
      </div>
      <div className="page-main">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData?.list}
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
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
}
