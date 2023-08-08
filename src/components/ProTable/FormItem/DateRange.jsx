import { DatePicker, Form } from "antd";

const { RangePicker } = DatePicker;

export default function Date({ item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <RangePicker style={{ width: 250 }} {...item.fieldProps} />
    </Form.Item>
  );
}
