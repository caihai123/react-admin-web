import { Button, Space, Tag, message } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { menuType } from "@/utils/dict";
import { getMenuAll } from "@/api/menu";

import type { ProTableProps } from "@/components/ProTable";
import type { Menu } from "@/api/menu";

export default function Page() {
  const columns: ProTableProps<Menu>["columns"] = [
    {
      title: "名称",
      dataIndex: "title",
    },
    {
      title: "路径",
      dataIndex: "path",
    },
    {
      title: "图标",
      dataIndex: "icon",
      hideInSearch: true,
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (type) => {
        const map = menuType.map[type];
        return <Tag color={map.color}>{map.label}</Tag>;
      },
      type: "select",
      options: menuType.options,
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
    <ProTable
      rowKey="id"
      columns={columns}
      headerTitle="菜单列表"
      request={async () => {
        const value = await getMenuAll();
        const { result: data } = value;
        return { list: data };
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
