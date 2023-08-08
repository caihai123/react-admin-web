import { DatePicker, Form } from "antd";

export default function Date({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <DatePicker placeholder={`请选择${item.title}`} {...item.fieldProps} />
    </Form.Item>
  );
}
