import { Checkbox as ACheckbox, Form } from "antd";

import type { GetProp, GetProps } from "antd";

type Item = {
  title: string;
  dataIndex?: string;
  options: GetProp<typeof ACheckbox.Group, "options">;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: Omit<GetProps<typeof ACheckbox.Group>, "options">;
};

export default function Checkbox({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ACheckbox.Group
        options={item.options}
        {...item.fieldProps}
      ></ACheckbox.Group>
    </Form.Item>
  );
}
