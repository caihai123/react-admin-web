import { useState } from "react";
import { useMount } from "ahooks";
import { Table, Button, Input, Space, Tag } from "antd";
import useAxios from "@/hooks/axios";

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
    },
    {
      title: "类型",
      render: (row) => {
        if (row.type === "1") {
          return <Tag color="#87d068">菜单</Tag>;
        } else if (row.type === "2") {
          return <Tag color="#108ee9">目录</Tag>;
        }
      },
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
      width: 120,
      fixed: "right",
    },
  ];

  const [tableData, setTableDate] = useState([]);

  const getTableData = function () {
    axios.get("/api/get-menu-all").then((value) => {
      setTableDate(value.result || []);
    });
  };
  useMount(() => {
    getTableData();
  });

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 16 }} size="middle">
        <Input.Search
          placeholder="可输入title path icon 查询"
          style={{ width: 400 }}
        />
        <Button type="primary">新增</Button>
      </Space>
      <div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
}
