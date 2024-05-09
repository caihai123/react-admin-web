import { Button, Space, Tag, Input } from "antd";
import axios from "@/utils/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { menuType } from "@/utils/dict";
import PermissionControl, {
  useFilterElementPermission,
} from "@/components/PermissionControl";

export default function Page() {
  const navigate = useNavigate();

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
        <Button
          type="primary"
          size="small"
          onClick={() => navigate(`add?parentId=${row.id}`)}
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

  const columns = [
    {
      title: "名称",
      dataIndex: "title",
      hideInSearch: true,
    },
    {
      title: "路径",
      dataIndex: "path",
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: "按钮",
      dataIndex: "buttonList",
      render: (buttonList) => {
        return buttonList?.map((item) => (
          <Tag key={item.id} color="#2db7f5">
            {item.name}
          </Tag>
        ));
      },
      hideInSearch: true,
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
      title="菜单列表"
      tableTitle={(total) => `菜单 ${total}`}
      request={() => {
        return axios.get("/api/get-menu-all").then((value) => {
          const { result: data } = value;
          return {
            list: data,
          };
        });
      }}
      pageActions={[
        <Input
          key="search"
          placeholder="通过菜单名称查询"
          prefix={<SearchOutlined />}
        />,
      ]}
      toolBarRender={
        <PermissionControl permission="add">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("add")}
          >
            新增
          </Button>
        </PermissionControl>
      }
      pagination={false}
    ></ProTable>
  );
}
