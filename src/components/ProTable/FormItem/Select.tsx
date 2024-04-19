import { Select as ASelect, Form, Badge } from "antd";

import type { GetProps, GetProp } from "antd";

type Item = {
  title: string;
  dataIndex?: string;
  options: GetProp<typeof ASelect, "options">;
  formItemProps?: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps?: Omit<GetProps<typeof ASelect>, "options">;
};

export default function Select({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ASelect
        placeholder={`请选择${item.title}`}
        style={{ width: 183 }}
        allowClear
        {...item.fieldProps}
      >
        {item.options.map((item) => (
          <ASelect.Option key={item.value} value={item.value}>
            {item.color ? (
              <Badge color={item.color} text={item.label} />
            ) : (
              item.label
            )}
          </ASelect.Option>
        ))}
      </ASelect>
    </Form.Item>
  );
}
