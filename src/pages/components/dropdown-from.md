# DropdownFrom

和 [Ant Design Pro Components](https://procomponents.ant.design/) 中 的 [QueryFilter](https://procomponents.ant.design/components/query-filter) 类似，虽然样式比较单一，但是我个人比较喜欢这种流式布局的感觉。

## 代码演示

```jsx
import { Form, Input, Select } from "antd";
import DropdownFrom from "@/components/DropdownFrom";

export default function Page() {
  return (
    <div>
      <DropdownFrom
        onFinish={(values) => {
          /** 执行查询操作 */
        }}
      >
        <Form.Item name="name">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item name="gender">
          <Select
            options={[
              { label: "男", value: "1" },
              { label: "女", value: "2" },
            ]}
            placeholder="请选择性别"
            style={{ width: 183 }}
          />
        </Form.Item>
      </DropdownFrom>
    </div>
  );
}
```

## Props

和 [antd](https://ant.design/index-cn) 的 [Form](https://ant.design/components/form-cn) 一致

## Ref

| 参数   | 说明         |
| ------ | ------------ |
| submit | 触发表单提交 |
| reset  | 触发表单重置 |
