import { Radio as ARadio, Form } from "antd";

export default function Radio({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ARadio.Group options={item.options} {...item.fieldProps}></ARadio.Group>
    </Form.Item>
  );
}
