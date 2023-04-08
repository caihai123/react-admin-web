import { useState, useRef } from "react";
import { usePagination } from "ahooks";
import { Table, Form, Input, Select, Button, Space, Switch, Tag } from "antd";
import styles from "@/styles/table-page.module.css";
import useAxios from "@/hooks/axios";

export default function Page() {
  const axios = useAxios();
  const columns = [
    {
      title: "真实姓名",
      dataIndex: "name",
    },
    {
      title: "账号",
      dataIndex: "account",
    },
    {
      title: "性别",
      key: "gender",
      render: (row) => {
        if (row.gender === 1) {
          return <Tag color="#2db7f5">男</Tag>;
        } else if (row.gender === 2) {
          return <Tag color="magenta">女</Tag>;
        }
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "状态",
      key: "status",
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
        .post("/api/account/page", {
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
        <Form layout="inline" onFinish={(values) => setParams(values)}>
          <Form.Item label="真实姓名" name="name">
            <Input placeholder="请输入真实姓名" />
          </Form.Item>
          <Form.Item label="账号" name="account">
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Select
              placeholder="请选择性别"
              options={[
                { value: 1, label: "男" },
                { value: 2, label: "女" },
              ]}
              style={{ width: 183 }}
            />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="邮箱" name="email">
            <Input placeholder="请输入邮箱" />
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
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                查 询
              </Button>
              <Button>重 置</Button>
            </Space>
          </Form.Item>
        </Form>
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
