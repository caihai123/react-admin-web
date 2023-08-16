import ProTable from "@/components/ProTable";
import { Alert, Button, Form, Slider, message } from "antd";
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
  ];

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
        request={() => ({
          list: [
            {
              id: "1",
              text: "text",
              select: "select",
            },
          ],
        })}
        batchBarRender={[
          <Button
            type="primary"
            key="del"
            danger
            onClick={() => message.warning("演示功能")}
          >
            批量删除
          </Button>,
          <Button
            type="primary"
            key="export"
            onClick={() => message.warning("演示功能")}
          >
            导出数据
          </Button>,
        ]}
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
      />
    </>
  );
}
