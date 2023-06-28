import { Button, Space, Tag } from "antd";
import useAxios from "@/hooks/axios";
import ProTable from "@/components/ProTable";
import { PlusOutlined } from "@ant-design/icons";

export default function Page() {
  const axios = useAxios();
  const columns = [
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
      render: (type) => {
        if (type === "1") {
          return <Tag color="#87d068">菜单</Tag>;
        } else if (type === "2") {
          return <Tag color="#108ee9">目录</Tag>;
        }
      },
      dataIndex: "type",
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
      request={() => {
        return axios.get("/api/get-menu-all").then((value) => {
          const { result: data } = value;
          return {
            list: data,
          };
        });
      }}
      toolBarRender={
        <Button type="primary" icon={<PlusOutlined />}>
          新增
        </Button>
      }
      pagination={false}
    ></ProTable>
  );
}
