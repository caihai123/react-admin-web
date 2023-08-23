import { useRef } from "react";
import { Button, Space, App } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable from "@/components/ProTable";
import axios from "@/utils/axios";
import OptimisticSwitch from "@/components/OptimisticSwitch";
import AddOrEdit from "./AddOrEdit";

export default function Page() {
  const { message } = App.useApp();

  // 更新角色状态
  const updateStatus = function (id, status) {
    return axios.post("/api/role/status/update", { id, status }).then(() => {
      // 如果觉得需要，也可以在此刷新表格
      message.success("切换成功！");
    });
  };

  const tableRef = useRef();
  const addOrEditRef = useRef();

  const columns = [
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
      render: (status, row) => (
        <OptimisticSwitch
          defaultChecked={status === 1}
          onChange={(val) => updateStatus(row.id, val ? 1 : 0)}
        />
      ),
      type: "select",
      options: [
        { label: "启用", value: "1" },
        { label: "禁用", value: "0" },
      ],
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
            onClick={() => addOrEditRef.current.editStart(row)}
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
          axios
            .post("/api/role/page", { params, pageIndex: current, pageSize })
            .then((value) => {
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
            onClick={() => addOrEditRef.current.addStart()}
          >
            新增
          </Button>,
        ]}
      />

      <AddOrEdit
        ref={addOrEditRef}
        callback={(pageIndex) => tableRef.current.refresh(pageIndex)}
      />
    </>
  );
}
