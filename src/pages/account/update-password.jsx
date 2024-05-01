import { Card, Form, Input, Button } from "antd";

export default function Page() {
  return (
    <Card title="修改密码">
      <Form
        labelCol={{
          span: 5,
        }}
        labelAlign="left"
        autoComplete="off"
        style={{ maxWidth: 440 }}
      >
        <Form.Item label="原密码" name="password" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newpassword"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="checkPassword"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
          }}
        >
          <Button type="primary" htmlType="submit" block>
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
