import { Button, Space, App, Alert } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetDeptAllQuery,
  useDeleteDeptItemMutation,
} from "@/store/api-slice/dept";
import { useFilterElementPermission } from "@/components/PermissionControl";
import AddEditModal from "./AddEditModal";

import type { ProTableProps } from "@/components/ProTable";
import type { Dept } from "@/api/system/dept";

export default function Page() {
  const { modal, message } = App.useApp();

  const { data: tableData, isLoading, refetch } = useGetDeptAllQuery();

  const [deleteDeptItem] = useDeleteDeptItemMutation();
  const deleteItem = function (id: Dept["id"]) {
    deleteDeptItem({ id })
      .unwrap()
      .then(() => {
        message.success("删除成功！");
      });
  };

  // 表格操作栏
  const [actionRender, isShowAction] = useFilterElementPermission(
    {
      render: (row) => (
        <AddEditModal.ManagedModal
          content={(set) => (
            <Button type="primary" ghost size="small" onClick={() => set(true)}>
              编辑
            </Button>
          )}
          key={row.id}
          initialValues={{
            id: row.id,
            parentId: row.parentId,
            deptName: row.deptName,
            description: row.description,
          }}
        ></AddEditModal.ManagedModal>
      ),
      permission: "edit",
    },
    {
      render: (row) => (
        <AddEditModal.ManagedModal
          content={(set) => (
            <Button type="primary" size="small" onClick={() => set(true)}>
              新增下级
            </Button>
          )}
          initialValues={{
            parentId: row.id,
          }}
        ></AddEditModal.ManagedModal>
      ),
      permission: "add",
    },
    {
      render: (row) => (
        <Button
          type="primary"
          danger
          size="small"
          onClick={() =>
            modal.confirm({
              title: "提示",
              content: "您确定要删除此部门及其子部门吗？",
              okType: "danger",
              onOk: () => deleteItem(row.id),
              centered: true,
            })
          }
        >
          删除
        </Button>
      ),
      permission: "del",
    }
  );

  const columns: ProTableProps["columns"] = [
    {
      title: "部门名称",
      dataIndex: "deptName",
    },
    {
      title: "备注",
      dataIndex: "description",
    },
    {
      title: "操作",
      key: "action",
      render: (row) => <Space>{actionRender(row)}</Space>,
      width: 100,
      fixed: "right",
      hideInTable: !isShowAction,
    },
  ];

  // 表格工具栏
  const [toolRender] = useFilterElementPermission(
    {
      render: () => (
        <AddEditModal.ManagedModal
          content={(set) => (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => set(true)}
            >
              新增
            </Button>
          )}
          key="add"
        ></AddEditModal.ManagedModal>
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
        <Button key="export" onClick={() => message.warning("演示功能")}>
          导出数据
        </Button>
      ),
      permission: "export",
    }
  );

  return (
    <>
      <Alert
        message="此页面用redux管理数据，主要用来演示和体验RTK查询的功能"
        type="info"
        showIcon
        closable
      />
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        headerTitle="部门列表"
        loading={isLoading}
        search={false}
        onRefresh={refetch}
        toolBarRender={toolRender()}
        batchBarRender={isShowBatch ? batchRender() : undefined}
      ></ProTable>
    </>
  );
}
