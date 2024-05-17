import React from "react";
import { Button, Space, Tag, App, Input, theme } from "antd";
import ProTable from "@/components/ProTable";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { menuType } from "@/utils/dict";
import { getMenuAll, removeMenu } from "@/api/system/menu";
import PermissionControl, {
  useFilterElementPermission,
} from "@/components/PermissionControl";
import AddOrEdit from "./AddOrEdit";
import { useRequest } from "ahooks";
import { treeFilter } from "@/utils/utils";

import type { ProTableProps } from "@/components/ProTable";
import type { Menu } from "@/api/system/menu";

export default function Page() {
  const { modal, message } = App.useApp();

  const {
    data: tableData,
    loading,
    refresh,
  } = useRequest(async () => {
    const response = await getMenuAll();
    return response.result;
  });

  // 根据菜单名称过滤列表 Start
  const [realVal, setRealVal] = React.useState<string>(); // 输入框实时value
  const [filterVal, setFilterVal] = React.useState<string>(); // 按下回车后保存realVal
  const filteredTableData = React.useMemo(() => {
    if (!filterVal) return tableData;
    return treeFilter(tableData, (item) =>
      item.title.toLowerCase().includes(filterVal.toLowerCase())
    );
  }, [tableData, filterVal]);
  // 根据菜单名称过滤列表 end

  // 新增或者编辑弹窗
  const [addOrEditRef, contextHolder] = AddOrEdit.useModal({
    menuTreeAll: tableData as Menu[],
    callback: (isAdd) => {
      refresh();
      if (isAdd) {
        // 新增后清除搜索条件
        setFilterVal(undefined);
        setRealVal(undefined);
      }
    },
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
        <Button
          type="primary"
          danger
          size="small"
          onClick={() =>
            modal.confirm({
              title: "提示",
              content: "确定要删除此菜单及其子菜单吗？",
              okType: "danger",
              onOk: () =>
                removeMenu(row.id).then(() => {
                  message.success("删除成功！");
                  refresh();
                }),
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

  const {
    token: { colorError },
  } = theme.useToken();

  const highlightSubstring = React.useCallback(
    function (text: string, keyword: string): string {
      if (!keyword) {
        return text; // 如果 keyword 为空，直接返回原字符串
      }

      // 使用正则表达式查找所有匹配的子字符串，并用 <span> 标签包裹
      const regex = new RegExp(`(${keyword})`, "gi"); // 'gi' 表示全局和不区分大小写
      return text.replace(regex, `<span style="color:${colorError}">$1</span>`);
    },
    [colorError]
  );

  const columns: ProTableProps<Menu>["columns"] = [
    {
      title: "名称",
      dataIndex: "title",
      render: (title) => (
        <div
          dangerouslySetInnerHTML={{
            __html: highlightSubstring(title, filterVal || ""),
          }}
        />
      ),
      width: 300,
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
        rowKey="id"
        dataSource={filteredTableData}
        search={false}
        columns={columns}
        headerTitle="菜单列表"
        toolBarRender={
          <Space>
            <Input
              value={realVal}
              prefix={<SearchOutlined />}
              placeholder="输入菜单名称查询"
              style={{ width: 200 }}
              onChange={(e) => setRealVal(e.target.value)}
              onPressEnter={() => setFilterVal(realVal)}
            ></Input>
            <PermissionControl permission="add">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => addOrEditRef.current?.addStart()}
              >
                新增
              </Button>
            </PermissionControl>
          </Space>
        }
        pagination={false}
        loading={loading}
        onRefresh={() => refresh()}
      ></ProTable>
      {contextHolder}
    </>
  );
}
