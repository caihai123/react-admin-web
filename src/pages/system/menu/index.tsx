import { Button, Space, Tag, message } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { menuType } from "@/utils/dict";
import { getMenuAll } from "@/api/menu";
import PermissionControl, {
  useFilterElementPermission,
} from "@/components/PermissionControl";

import type { ProTableProps } from "@/components/ProTable";
import type { Menu } from "@/api/menu";

export default function Page() {
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
          新增下级
        </Button>
      ),
      permission: "add",
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
      render: (type: Menu["type"]) => {
        const map = menuType.map[type];
        return <Tag color={map.color}>{map.label}</Tag>;
      },
      type: "select",
      options: menuType.options,
    },
    {
      title: "按钮",
      dataIndex: "buttonList",
      render: (buttonList: Menu["buttonList"]) => {
        return buttonList?.map((item) => (
          <Tag key={item.id} color="#2db7f5">
            {item.name}
          </Tag>
        ));
      },
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
      rowKey="id"
      columns={columns}
      headerTitle="菜单列表"
      request={async () => {
        const value = await getMenuAll();
        const { result: data } = value;
        return { list: data };
      }}
      toolBarRender={
        <PermissionControl permission="add">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => message.warning("演示功能")}
          >
            新增
          </Button>
        </PermissionControl>
      }
      pagination={false}
    ></ProTable>
  );
}
