import { Button, Space, App } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetDeptAllQuery,
  useDeleteDeptItemMutation,
} from "@/store/api/deptSlice";
import { useRef } from "react";

export default function Page() {
  const proTable = useRef(null);

  const { data: tableData, isFetching, refetch } = useGetDeptAllQuery();

  const { message, modal } = App.useApp();
  const [deleteDeptItem] = useDeleteDeptItemMutation();
  const deleteItem = function ({ id, deptName }) {
    modal.confirm({
      title: "提示",
      content: `确定删除【${deptName}】吗？`,
      onOk: () =>
        deleteDeptItem({ id })
          .unwrap()
          .then(() => {
            message.success("删除成功！");
            proTable.current.refresh();
          }),
      centered: true,
    });
  };

  const columns = [
    {
      title: "部门名称",
      dataIndex: "deptName",
    },
    {
      title: "描述",
      dataIndex: "description",
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
            新增下级
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => deleteItem(row)}
          >
            删除
          </Button>
        </Space>
      ),
      width: 100,
      fixed: "right",
    },
  ];

  return (
    <ProTable
      ref={proTable}
      rowKey="id"
      columns={columns}
      dataSource={tableData}
      headerTitle="部门列表"
      loading={isFetching}
      search={false}
      onRefresh={refetch}
      toolBarRender={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>
      }
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
    ></ProTable>
  );
}
