import { Select as ASelect, Form } from "antd";

export default function Select({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ASelect
        placeholder={`请选择${item.title}`}
        options={item.options}
        style={{ width: 183 }}
        {...item.fieldProps}
      />
    </Form.Item>
  );
}
