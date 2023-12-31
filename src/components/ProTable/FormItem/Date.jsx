import { DatePicker, Form } from "antd";

export default function Date({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <DatePicker {...item.fieldProps} />
    </Form.Item>
  );
}
