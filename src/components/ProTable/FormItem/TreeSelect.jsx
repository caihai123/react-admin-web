import { TreeSelect as ATreeSelect, Form } from "antd";

export default function TreeSelect({ item }) {
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
