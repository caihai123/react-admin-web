import { DatePicker, Form } from "antd";

import type { GetProps } from "antd";

const { RangePicker } = DatePicker;

type Item = {
  title: string;
  dataIndex?: string;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: GetProps<typeof RangePicker>;
};

export default function Date({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <RangePicker style={{ width: 250 }} {...item.fieldProps} />
    </Form.Item>
  );
}
