import { Form, Avatar, Space, Button, Input, Row, Col, TreeSelect } from "antd";
import DictSelect from "@/components/DictSelect";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();

  return (
    <Form
      layout="vertical"
      autoComplete="off"
      initialValues={{
        account: "admin",
        name: "Cai Hai",
        gender: "1",
        phone: "18888888888",
        email: "12345678@email.com",
        deptId: ["1", "2"],
      }}
    >
      <div>
        <h2>我的头像</h2>
        <Form.Item name="avatar">
          <Space>
            <Avatar
              size={100}
              src="https://avatars.githubusercontent.com/u/47770861?v=4"
            />
            <Button>上传</Button>
          </Space>
        </Form.Item>
      </div>

      <div>
        <h2>基础信息</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="用户名/账号"
              name="account"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="真实姓名"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
              <DictSelect dictName="gender" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="手机号" name="phone" rules={[{ required: true }]}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="电子邮件"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="个人简介">
              <Input.TextArea placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div>
        <h2>所属部门</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="deptId" rules={[{ required: true }]}>
              <TreeSelect treeData={depeOptions} disabled multiple></TreeSelect>
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Button type="primary" htmlType="submit">
        保存更改
      </Button>
    </Form>
  );
}
