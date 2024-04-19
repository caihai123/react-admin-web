import { Input as AInput, Form } from "antd";

import type { GetProps } from "antd";

type Item = {
  title: string;
  dataIndex?: string;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: GetProps<typeof AInput>;
};

export default function Input({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <AInput placeholder={`请输入${item.title}`} {...item.fieldProps} />
    </Form.Item>
  );
}
