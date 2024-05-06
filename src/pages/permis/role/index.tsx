import { useRef } from "react";
import { Button, Space, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable from "@/components/ProTable";
import OptimisticSwitch from "@/components/OptimisticSwitch";
import AddOrEdit from "./AddOrEdit";
import { roleEnabledState } from "@/utils/dict";
import { getRoleList, updateRoleStatusById } from "@/api/role";

import type { ProTableProps, Ref } from "@/components/ProTable";
import type { Role } from "@/api/role";
import type { Ref as AddOrEditRef } from "./AddOrEdit";

export default function Page() {
  const { message } = App.useApp();

  const tableRef = useRef<Ref>(null);
  const addOrEditRef = useRef<AddOrEditRef>(null);

  const columns: ProTableProps["columns"] = [
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
      render: (status, row) => {
        const { enabled, disabled } = roleEnabledState.enum;
        return (
          <OptimisticSwitch
            defaultChecked={status === enabled}
            onChange={(val) =>
              updateRoleStatusById(
                row.id,
                val ? (enabled as Role["status"]) : (disabled as Role["status"])
              ).then(() => {
                // 如果觉得需要，也可以在此刷新表格
                message.success("切换成功！");
              })
            }
          />
        );
      },
      type: "select",
      options: roleEnabledState.options,
    },
    {
      title: "操作",
      key: "action",
      render: (row) => (
        <Space>
          <Button
            type="primary"
            ghost
            size="small"
            onClick={() => addOrEditRef.current?.editStart(row)}
          >
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
    <>
      <ProTable
        ref={tableRef}
        columns={columns}
        rowKey="id"
        headerTitle="角色列表"
        request={(params, { current, pageSize }) =>
          getRoleList(params, current, pageSize).then((value) => {
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
            onClick={() => addOrEditRef.current?.addStart()}
          >
            新增
          </Button>,
        ]}
      />

      <AddOrEdit
        ref={addOrEditRef}
        callback={(pageIndex) => tableRef.current?.refresh(pageIndex)}
      />
    </>
  );
}
