import { Button, Space, App, Popconfirm, Alert } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import {
  useGetDeptAllQuery,
  useDeleteDeptItemMutation,
} from "@/store/api/deptSlice";
import { useRef } from "react";

export default function Page() {
  const { message } = App.useApp();

  const proTable = useRef(null);

  const { data: tableData, isLoading, refetch } = useGetDeptAllQuery();

  const [deleteDeptItem] = useDeleteDeptItemMutation();
  const deleteItem = function (id) {
    deleteDeptItem({ id })
      .unwrap()
      .then(() => {
        message.success("删除成功！");
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
        </Space>
      ),
      width: 100,
      fixed: "right",
    },
  ];

  return (
    <>
      <Alert
        message="此页面用redux管理数据，主要用来演示和体验RTK查询的功能"
        type="info"
        showIcon
        closable
      />
      <ProTable
        ref={proTable}
        rowKey="id"
        columns={columns}
        dataSource={tableData}
        headerTitle="部门列表"
        loading={isLoading}
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
    </>
  );
}
