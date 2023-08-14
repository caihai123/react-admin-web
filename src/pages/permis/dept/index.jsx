import { Button, Space, App } from "antd";
import axios from "@/utils/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { useDeleteDeptItemMutation } from "@/store/modules/catch-api";
import { useRef } from "react";

export default function Page() {
  const proTable = useRef(null);

  const { message, modal } = App.useApp();
  const [deleteDeptItem] = useDeleteDeptItemMutation();
  const deleteItem = function (id) {
    modal.confirm({
      title: "提示",
      content: "确定删除当前部门吗？",
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
      hideInSearch: true,
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
            onClick={() => deleteItem(row.id)}
          >
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
      ref={proTable}
      rowKey="id"
      columns={columns}
      headerTitle="部门列表"
      request={() => {
        return axios.get("/api/dept-all/get").then((value) => {
          const { result: data } = value;
          return {
            list: data,
          };
        });
      }}
      toolBarRender={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => message.warning("演示功能")}
        >
          新增
        </Button>
      }
      pagination={false}
    ></ProTable>
  );
}
