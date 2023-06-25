import { useRef } from "react";
import { Button, Space, Switch, Tag } from "antd";
import useAxios from "@/hooks/axios";
import ProTable from "@/components/ProTable";

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
      type: "select",
      options: [
        { label: "男", value: 1 },
        { label: "女", value: 2 },
      ],
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
      type: "select",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
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
      hideInSearch: true,
    },
  ];

  const addOrEditRef = useRef(null);

  return (
    <ProTable
      columns={columns}
      rowKey="id"
      headerTitle="用户列表"
      request={(params, { current, pageSize }) =>
        axios
          .post("/api/account/page", { params, pageIndex: current, pageSize })
          .then((value) => {
            const { result: data } = value;
            return {
              list: data.records,
              total: data.total,
            };
          })
      }
      toolBarRender={
        <Button type="primary" onClick={() => addOrEditRef.current.onStart()}>
          新增
        </Button>
      }
    />
  );
}
