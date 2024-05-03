import { Button, message, Space, Switch, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { gender as genderDict, accountEnabledState } from "@/utils/dict";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";
import { useFilterElementPermission } from "@/components/PermissionControl";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();
  const navigate = useNavigate();

  // 表格的操作栏
  const [actionRender, isShowAction] = useFilterElementPermission(
    {
      render: (row) => (
        <Button
          type="primary"
          size="small"
          onClick={() => navigate(`/permis/account/detail?id=${row.id}`)}
        >
          详情
        </Button>
      ),
      role: ["admin"],
    },
    {
      render: (row) => (
        <Button type="primary" ghost size="small">
          编辑
        </Button>
      ),
      role: ["admin"],
    },
    {
      render: (row) => (
        <Button type="primary" size="small" style={{ background: "#e6a23c" }}>
          授权
        </Button>
      ),
      role: ["admin"],
    },
    {
      render: (row) => (
        <Button type="primary" danger size="small">
          删除
        </Button>
      ),
      role: ["admin"],
    }
  );

  // 表格的批量操作栏
  const [batchRender, isShowBatch] = useFilterElementPermission(
    {
      render: () => (
        <Button
          type="primary"
          danger
          onClick={() => message.warning("演示功能")}
        >
          批量删除
        </Button>
      ),
      role: ["admin"],
    },
    {
      render: () => (
        <Button onClick={() => message.warning("演示功能")}>导出数据</Button>
      ),
      role: ["admin"],
    }
  );

  // 表格工具栏
  const [toolRender] = useFilterElementPermission(
    {
      render: () => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>
      ),
      role: ["admin"],
    },
    {
      render: () => (
        <Button onClick={() => message.warning("演示功能")}>导出</Button>
      ),
      role: ["admin"],
    }
  );

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
      render: (status) => (
        <Switch checked={status === accountEnabledState.enum.enabled} />
      ),
      type: "select",
      options: accountEnabledState.options,
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
      render: (row) => <Space>{actionRender(row)}</Space>,
      width: 100,
      fixed: "right",
      hideInSearch: true,
      hideInTable: !isShowAction,
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
      batchBarRender={isShowBatch ? batchRender() : undefined}
      toolBarRender={toolRender()}
    />
  );
}
