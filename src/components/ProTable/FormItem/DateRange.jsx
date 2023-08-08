import { DatePicker, Form } from "antd";

const { RangePicker } = DatePicker;

export default function Date({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <RangePicker {...item.fieldProps} />
    </Form.Item>
  );
}
