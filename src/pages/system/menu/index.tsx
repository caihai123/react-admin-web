import React, { useState } from "react";
import { Button, Space, Tag } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";
import { menuType } from "@/utils/dict";
import { getMenuAll } from "@/api/menu";
import PermissionControl, {
  useFilterElementPermission,
} from "@/components/PermissionControl";
import AddOrEdit from "./AddOrEdit";

import type { ProTableProps, Ref } from "@/components/ProTable";
import type { Menu } from "@/api/menu";

export default function Page() {
  const tableRef = React.useRef<Ref>(null);

  const [menuTreeAll, setMenuTreeAll] = useState<Menu[]>([]);

  const [addOrEditRef, contextHolder] = AddOrEdit.useModal({
    menuTreeAll,
    callback: () => tableRef.current?.refresh(),
  });

  // 表格的操作栏
  const [actionRender, isShowAction] = useFilterElementPermission(
    {
      render: (row) => (
        <Button
          type="primary"
          ghost
          size="small"
          onClick={() => addOrEditRef.current?.editStart(row)}
        >
          编辑
        </Button>
      ),
      permission: "edit",
    },
    {
      render: (row) => (
        <Button
          type="primary"
          size="small"
          onClick={() => addOrEditRef.current?.addStart(row.id)}
        >
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
    <>
      <ProTable
        ref={tableRef}
        rowKey="id"
        search={false}
        columns={columns}
        headerTitle="菜单列表"
        request={async () => {
          const value = await getMenuAll();
          const { result: data } = value;
          setMenuTreeAll(data);
          return { list: data };
        }}
        toolBarRender={
          <PermissionControl permission="add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addOrEditRef.current?.addStart()}
            >
              新增
            </Button>
          </PermissionControl>
        }
        pagination={false}
      ></ProTable>
      {contextHolder}
    </>
  );
}
