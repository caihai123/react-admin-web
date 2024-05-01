import {
  Card,
  Form,
  Avatar,
  Space,
  Button,
  Input,
  Row,
  Col,
  TreeSelect,
} from "antd";
import DictSelect from "@/components/DictSelect";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();

  return (
    <Card title="基础信息">
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
        <Row gutter={16}>
          <Col span={24} xxl={8}>
            <Form.Item name="avatar">
              <Space>
                <Avatar
                  size={166}
                  src="https://avatars.githubusercontent.com/u/47770861?v=4"
                />
                <Button>上传</Button>
              </Space>
            </Form.Item>
          </Col>
          <Col span={24} xxl={16}>
            <Form.Item label="个人简介">
              <Input.TextArea showCount maxLength={100} placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item
              label="用户名/账号"
              name="account"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item
              label="真实姓名"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item
              label="所属部门"
              name="deptId"
              rules={[{ required: true }]}
            >
              <TreeSelect treeData={depeOptions} disabled multiple></TreeSelect>
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item label="性别" name="gender" rules={[{ required: true }]}>
              <DictSelect dictName="gender" />
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item label="手机号" name="phone" rules={[{ required: true }]}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item
              label="电子邮件"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          保存更改
        </Button>
      </Form>
    </Card>
  );
}
