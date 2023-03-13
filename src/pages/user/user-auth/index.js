import { useState } from "react";
import { usePagination } from "ahooks";
import { Table, Form, Input, Button, Space } from "antd";
import axios from "@/utils/axios";
import styles from "@/styles/table-page.module.css";

export default function Page() {
  const columns = [
    {
      title: "账号名",
      dataIndex: "userAccount",
    },
    {
      title: "真实姓名",
      dataIndex: "userName",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "部门名称",
      dataIndex: "belongOrgName",
    },
    {
      title: "是否启用",
      dataIndex: "userStatus",
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <Space>
          <Button type="primary" size="small">
            授权
          </Button>
          <Button type="primary" ghost size="small">
            修改
          </Button>
          <Button size="small">重置</Button>
          <Button type="primary" danger size="small">
            删除
          </Button>
        </Space>
      ),
      width: 120,
      fixed: "right",
    },
  ];

  const [params, setParams] = useState();
  const { data: tableData, pagination } = usePagination(
    ({ current, pageSize }) => {
      return axios
        .post("/api/core/sys/user/page", {
          pageIndex: current,
          pageSize,
          params: { ...params },
        })
        .then((value) => {
          const data = value.data;
          return {
            list: data.data,
            total: data.totalCount,
          };
        });
    },
    {
      refreshDeps: [params],
    }
  );

  return (
    <div style={{ padding: 20 }}>
      <div className={styles["page-head"]}>
        <Form layout="inline" onFinish={(values) => setParams(values)}>
          <Form.Item label="所属部门" name="organizationId">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="账户名" name="userAccount">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="真实姓名" name="userName">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="账户状态" name="status">
            <Input placeholder="" />
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
        <Button type="primary">新增</Button>
      </div>
      <div className="page-main">
        <Table
          rowKey="userId"
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
        />
      </div>
    </div>
  );
}
