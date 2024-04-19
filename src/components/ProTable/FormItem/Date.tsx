import { DatePicker, Form } from "antd";

import type { GetProps } from "antd";

type Item = {
  title: string;
  dataIndex?: string;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: GetProps<typeof DatePicker>;
};

export default function Date({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <DatePicker {...item.fieldProps} />
    </Form.Item>
  );
}
