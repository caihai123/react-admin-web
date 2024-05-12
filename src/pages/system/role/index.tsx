import { useRef } from "react";
import { Button, Space, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable from "@/components/ProTable";
import OptimisticSwitch from "@/components/OptimisticSwitch";
import AddOrEdit from "./AddOrEdit";
import { roleEnabledState } from "@/utils/dict";
import { getRoleList, updateRoleStatusById } from "@/api/role";
import PermissionControl, {
  useFilterElementPermission,
} from "@/components/PermissionControl";

import type { ProTableProps, Ref } from "@/components/ProTable";
import type { Role } from "@/api/role";
import type { Ref as AddOrEditRef } from "./AddOrEdit";

export default function Page() {
  const { message } = App.useApp();

  const tableRef = useRef<Ref>(null);
  const addOrEditRef = useRef<AddOrEditRef>(null);

  // 表格的操作栏
  const [actionRender, isShowAction] = useFilterElementPermission(
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
        <Button type="primary" size="small">
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
      render: (row) => <Space>{actionRender(row)}</Space>,
      width: 100,
      fixed: "right",
      hideInSearch: true,
      hideInTable: !isShowAction,
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
        toolBarRender={() => (
          <PermissionControl permission="add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addOrEditRef.current?.addStart()}
            >
              新增
            </Button>
          </PermissionControl>
        )}
      />

      <AddOrEdit
        ref={addOrEditRef}
        callback={(pageIndex) => tableRef.current?.refresh(pageIndex)}
      />
    </>
  );
}
