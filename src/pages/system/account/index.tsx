import { Button, message, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { gender as genderDict, accountEnabledState } from "@/utils/dict";
import { useGetDeptSelectQuery } from "@/store/api-slice/dept";
import { useFilterElementPermission } from "@/components/PermissionControl";
import { getAccountList, updateAccountStatusById } from "@/api/account";
import OptimisticSwitch from "@/components/OptimisticSwitch";

import type { ProTableProps } from "@/components/ProTable";
import type { Account } from "@/api/account";

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
          onClick={() => navigate("/permis/account/detail")}
        >
          详情
        </Button>
      ),
      permission: "details",
    },
    {
      render: (row) => (
        <Button type="primary" ghost size="small">
          编辑
        </Button>
      ),
      permission: "edit",
    },
    {
      render: (row) => (
        <Button type="primary" size="small" style={{ background: "#e6a23c" }}>
          授权
        </Button>
      ),
      permission: "accredit",
    },
    {
      render: (row) => (
        <Button type="primary" danger size="small">
          删除
        </Button>
      ),
      permission: "del",
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
      permission: "del",
    },
    {
      render: () => (
        <Button onClick={() => message.warning("演示功能")}>导出数据</Button>
      ),
      permission: "export",
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
      permission: "add",
    },
    {
      render: () => (
        <Button onClick={() => message.warning("演示功能")}>导出</Button>
      ),
      permission: "export",
    }
  );

  const columns: ProTableProps["columns"] = [
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
      render: (status, row) => {
        const { enabled, disabled } = accountEnabledState.enum;
        return (
          <OptimisticSwitch
            defaultChecked={status === enabled}
            onChange={(val) =>
              updateAccountStatusById(
                row.id,
                val
                  ? (enabled as Account["status"])
                  : (disabled as Account["status"])
              ).then(() => {
                // 如果觉得需要，也可以在此刷新表格
                message.success("切换成功！");
              })
            }
          />
        );
      },
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
        return getAccountList(params, current, pageSize).then((value) => {
          const { result: data } = value;
          return {
            list: data.records,
            total: data.total,
          };
        });
      }}
      toolBarRender={toolRender()}
      batchBarRender={isShowBatch ? batchRender() : undefined}
    />
  );
}
