import { Radio as ARadio, Form } from "antd";

import type { GetProps, GetProp } from "antd";

type Item = {
  title: string;
  dataIndex?: string;
  options: GetProp<typeof ARadio.Group, "options">;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: Omit<GetProps<typeof ARadio.Group>, "options">;
};

export default function Radio({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ARadio.Group options={item.options} {...item.fieldProps}></ARadio.Group>
    </Form.Item>
  );
}
