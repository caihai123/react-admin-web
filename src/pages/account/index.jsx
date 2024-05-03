import { useEffect } from "react";
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
  Checkbox,
} from "antd";
import DictSelect from "@/components/DictSelect";
import { useGetDeptSelectQuery } from "@/store/api/deptSlice";
import { useButtonAuthorization } from "@/components/PermissionControl";
import { useSelector } from "react-redux";
import { selectUserinfo } from "@/store/userinfo";

export default function Page() {
  const { data: depeOptions } = useGetDeptSelectQuery();
  const hasButtonPermission = useButtonAuthorization();
  const userinfo = useSelector(selectUserinfo);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(JSON.parse(JSON.stringify(userinfo)));
  }, [userinfo, form]);

  return (
    <Card title="基础信息">
      <Form form={form} layout="vertical" autoComplete="off">
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
            <Form.Item
              label="用户名/账号"
              name="account"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item label="个人简介" name="description">
              <Input.TextArea showCount maxLength={100} placeholder="请输入" />
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
              <TreeSelect
                treeData={depeOptions}
                disabled={!hasButtonPermission(["admin"])}
                multiple
              ></TreeSelect>
            </Form.Item>
          </Col>
          <Col span={12} xxl={8}>
            <Form.Item label="角色" name="role">
              <Checkbox.Group
                options={[
                  { label: "管理员", value: "admin" },
                  { label: "用户", value: "user" },
                ]}
                disabled={!hasButtonPermission(["admin"])}
                placeholder="请选择"
              />
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
