import { Button, message, Space, Switch, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { gender as genderDict } from "@/utils/dict";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();
  const navigate = useNavigate();

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
        const map = genderDict.map[gender];
        const tag = {
          color: map?.color || "rgba(0,0,0,.25)",
          label: map?.label || "未知",
        };
        return <Tag color={tag.color}>{tag.label}</Tag>;
      },
      type: "select",
      options: genderDict.options,
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
      title: "部门",
      dataIndex: "deptId",
      type: "treeSelect",
      options: depeOptions,
      render: (_, row) => row.deptName,
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => navigate("/permis/account/detail")}
          >
            详情
          </Button>
          <Button type="primary" ghost size="small">
            编辑
          </Button>
          <Button type="primary" size="small" style={{ background: "#e6a23c" }}>
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
        <Button key="export" onClick={() => message.warning("演示功能")}>
          导出数据
        </Button>,
      ]}
      toolBarRender={[
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>,
        <Button key="export" onClick={() => message.warning("演示功能")}>
          导出
        </Button>,
      ]}
    />
  );
}
