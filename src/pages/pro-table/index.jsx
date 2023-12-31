import Mock from "mockjs";
import ProTable from "@/components/ProTable";
import { Alert, Button, Form, Slider, message, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ProTableDemo() {
  const columns = [
    {
      title: "text",
      dataIndex: "text",
      initialValue: "initial text",
    },
    {
      title: "select",
      dataIndex: "select",
      type: "select",
      options: [
        { label: "选项一", value: 1 },
        { label: "选项二", value: 2 },
        { label: "选项三", value: 3 },
      ],
      initialValue: 1,
    },
    {
      title: "checkbox",
      dataIndex: "checkbox",
      type: "checkbox",
      options: [
        { label: "选项一", value: 1 },
        { label: "选项二", value: 2 },
        { label: "选项三", value: 3 },
      ],
      initialValue: [1, 2],
    },
    {
      title: "radio",
      dataIndex: "radio",
      type: "radio",
      options: [
        { label: "选项一", value: 1 },
        { label: "选项二", value: 2 },
        { label: "选项三", value: 3 },
      ],
      initialValue: 1,
    },
    {
      title: "date",
      dataIndex: "date",
      type: "date",
    },
    {
      title: "dateTime",
      dataIndex: "dateTime",
      type: "date",
      fieldProps: { showTime: true },
    },
    {
      title: "week",
      dataIndex: "week",
      type: "date",
      fieldProps: { picker: "week" },
    },
    {
      title: "month",
      dataIndex: "month",
      type: "date",
      fieldProps: { picker: "month" },
    },
    {
      title: "quarter",
      dataIndex: "quarter",
      type: "date",
      fieldProps: { picker: "quarter" },
    },
    {
      title: "year",
      dataIndex: "year",
      type: "date",
      fieldProps: { picker: "year" },
    },
    {
      title: "dateRange",
      dataIndex: "dateRange",
      type: "dateRange",
    },
    {
      title: "dateTimeRange",
      dataIndex: "dateTimeRange",
      type: "dateRange",
      fieldProps: { showTime: true },
    },
    {
      title: "weekRange",
      dataIndex: "weekRange",
      type: "dateRange",
      fieldProps: { picker: "week" },
    },
    {
      title: "monthRange",
      dataIndex: "monthRange",
      type: "dateRange",
      fieldProps: { picker: "month" },
    },
    {
      title: "quarterRange",
      dataIndex: "quarterRange",
      type: "dateRange",
      fieldProps: { picker: "quarter" },
    },
    {
      title: "yearRange",
      dataIndex: "yearRange",
      type: "dateRange",
      fieldProps: { picker: "year" },
    },
    {
      title: "custom",
      dataIndex: "custom",
      renderFormItem: () => {
        return (
          <Form.Item label="custom" name="custom">
            <Slider style={{ width: 200 }} />
          </Form.Item>
        );
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
          <Button type="primary" danger size="small">
            删除
          </Button>
        </Space>
      ),
      fixed: "right",
      hideInSearch: true,
    },
  ];

  const tableData = [...Array(15)].map(() =>
    Mock.mock({
      id: "@guid",
      text: "@ctitle",
      "select|1": [1, 2, 3],
      "checkbox|1": [1, 2, 3],
      "radio|1": [1, 2, 3],
      date: "@date",
      dateTime: "@datetime",
      week: "2023-31周",
      month: "2023-02",
      "quarter|1": ["1季度", "2季度", "3季度", "4季度"],
      year: "2023",
      dateRange: "@date",
      dateTimeRange: "@datetime",
      weekRange: "2023-31周",
      monthRange: "2023-02",
      "quarterRange|1": ["1季度", "2季度", "3季度", "4季度"],
      yearRange: "2023",
      "custom|0-100": 1,
    })
  );

  return (
    <>
      <Alert
        message="此页面主要演示搜索表单栏的配置项"
        type="info"
        showIcon
        closable
      />
      <ProTable
        rowKey="id"
        headerTitle="数据列表"
        columns={columns}
        dataSource={tableData}
        batchBarRender={[
          <Button
            type="primary"
            key="del"
            danger
            onClick={() => message.warning("演示功能")}
          >
            批量删除
          </Button>,
          <Button key="export" onClick={() => message.warning("演示功能")}>
            导出数据
          </Button>,
        ]}
        toolBarRender={(params) => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => message.warning("演示功能")}
          >
            新增
          </Button>,
          <Button key="export" onClick={() => message.warning("演示功能")}>
            导出
          </Button>,
        ]}
      />
    </>
  );
}
