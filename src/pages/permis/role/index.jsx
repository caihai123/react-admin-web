import { Button, Space, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable from "@/components/ProTable";
import axios from "@/utils/axios";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();

  const columns = [
    {
      title: "角色名称",
      dataIndex: "roleName",
    },
    {
      title: "备注",
      dataIndex: "description",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (status) => <Switch checked={status === 1} />,
      type: "select",
      options: [
        { label: "启用", value: "1" },
        { label: "禁用", value: "0" },
      ],
    },
    {
      title: "部门",
      dataIndex: "deptId",
      type: "treeSelect",
      options: depeOptions,
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
      headerTitle="角色列表"
      request={(params, { current, pageSize }) =>
        axios
          .post("/api/role/page", { params, pageIndex: current, pageSize })
          .then((value) => {
            const { result: data } = value;
            return {
              list: data.records,
              total: data.total,
            };
          })
      }
      toolBarRender={() => [
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>,
      ]}
    />
  );
}
