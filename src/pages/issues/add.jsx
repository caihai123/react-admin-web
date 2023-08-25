import { Card, Button, Form, Input, Row, Col, Space } from "antd";
import IssuePinned from "./components/IssuePinned";
import IssuePriority from "./components/IssuePriority";
import IssueType from "./components/IssueType";

export default function IssuesAdd() {
  return (
    <Card>
      <h1>新建 Issue</h1>
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="标题" name="title" rules={[{ required: true }]}>
              <Input placeholder="标题" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="内容">
              <Input.TextArea placeholder="内容" rows={10} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="标签">
              <IssueType placeholder="未设置" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="优先级">
              <IssuePriority defaultValue={0} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="置顶">
              <IssuePinned defaultValue={0} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button type="primary">创建</Button>
                <Button>创建并继续</Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
