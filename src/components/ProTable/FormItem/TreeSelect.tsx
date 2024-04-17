import { TreeSelect as ATreeSelect, Form } from "antd";

import type { GetProps, GetProp } from "antd";

type Item = {
  title: string;
  dataIndex: string;
  options: GetProp<typeof ATreeSelect, "treeData">;
  formItemProps: Omit<GetProps<typeof Form.Item>, "label" | "name">;
  fieldProps: Omit<GetProps<typeof ATreeSelect>, "options">;
};

export default function TreeSelect({ item }: { item: Item }) {
  return (
    <Form.Item label={item.title} name={item.dataIndex} {...item.formItemProps}>
      <ATreeSelect
        placeholder={`请选择${item.title}`}
        treeData={item.options}
        style={{ width: 183 }}
        allowClear
        {...item.fieldProps}
      />
    </Form.Item>
  );
}
