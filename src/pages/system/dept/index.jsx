import { Button, Space, App, Popconfirm, Alert, Input } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  useGetDeptAllQuery,
  useDeleteDeptItemMutation,
} from "@/store/apiSlice/dept";
import { useFilterElementPermission } from "@/components/PermissionControl";

export default function Page() {
  const { message } = App.useApp();

  const { data: tableData, isLoading, refetch } = useGetDeptAllQuery();

  const [deleteDeptItem] = useDeleteDeptItemMutation();
  const deleteItem = function (id) {
    deleteDeptItem({ id })
      .unwrap()
      .then(() => {
        message.success("删除成功！");
      });
  };

  // 表格操作栏
  const [actionRender, isShowAction] = useFilterElementPermission(
    {
      render: () => (
        <Button type="primary" ghost size="small">
          编辑
        </Button>
      ),
      permission: "edit",
    },
    {
      render: () => (
        <Button type="primary" size="small">
          新增下级
        </Button>
      ),
      permission: "add",
    },
    {
      render: (row) => (
        <Popconfirm
          title="提示"
          description="您确定要删除此部门吗?"
          onConfirm={() => deleteItem(row.id)}
          okText="确定"
          cancelText="取消"
        >
          <Button type="primary" danger size="small">
            删除
          </Button>
        </Popconfirm>
      ),
      permission: "del",
    }
  );

  // 表格列配置
  const columns = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      hideInSearch: true,
    },
    {
      title: "描述",
      dataIndex: "description",
      hideInSearch: true,
    },
    {
      title: "操作",
      key: "action",
      render: (row) => <Space>{actionRender(row)}</Space>,
      width: 100,
      fixed: "right",
      hideInTable: !isShowAction,
      hideInSearch: true,
    },
  ];

  // 表格工具栏
  const [toolRender] = useFilterElementPermission(
    {
      render: () => (
        <Button onClick={() => message.warning("演示功能")}>导出</Button>
      ),
      permission: "export",
    },
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
        title="部门列表"
        tableTitle={(total) => `部门 ${total}`}
        loading={isLoading}
        onRefresh={refetch}
        pageActions={[
          <Input
            key="search"
            placeholder="通过部门名称查询"
            prefix={<SearchOutlined />}
          />,
        ]}
        toolBarRender={toolRender()}
        batchBarRender={isShowBatch ? batchRender() : undefined}
      ></ProTable>
    </>
  );
}
