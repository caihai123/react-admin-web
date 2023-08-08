import { Input as AInput, Form } from "antd";

export default function Input({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <AInput placeholder={`请输入${item.title}`} {...item.fieldProps} />
    </Form.Item>
  );
}
