import { Button, message, Space, Switch, Tag } from "antd";
import useAxios from "@/hooks/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import dict from "@/utils/dict";

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
      dataIndex: "gender",
      render: (gender) => {
        if (gender === 1) {
          return <Tag color="#2db7f5">男</Tag>;
        } else if (gender === 2) {
          return <Tag color="magenta">女</Tag>;
        } else {
          return gender;
        }
      },
      type: "select",
      options: dict["gender"].options,
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
      dataIndex: "status",
      render: (status) => <Switch checked={status === 1} />,
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

  return (
    <ProTable
      columns={columns}
      rowKey="id"
      headerTitle="用户列表"
      request={(params, { current, pageSize }) => {
        return axios
          .post("/api/account/page", { params, pageIndex: current, pageSize })
          .then((value) => {
            const { result: data } = value;
            return {
              list: data.records,
              total: data.total,
            };
          });
      }}
      batchBarRender={[
        <Button
          type="primary"
          key="del"
          danger
          onClick={() => message.warning("演示功能")}
        >
          批量删除
        </Button>,
        <Button
          type="primary"
          key="export"
          onClick={() => message.warning("演示功能")}
        >
          导出数据
        </Button>,
      ]}
      toolBarRender={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>
      }
    />
  );
}
