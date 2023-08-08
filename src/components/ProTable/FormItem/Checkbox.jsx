import { Checkbox as ACheckbox, Form } from "antd";

export default function Checkbox({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ACheckbox.Group
        options={item.options}
        {...item.fieldProps}
      ></ACheckbox.Group>
    </Form.Item>
  );
}
