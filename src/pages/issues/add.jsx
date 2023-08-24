import { Card, Button, Form, Input, Row, Col, Space, Select } from "antd";

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
              <Select
                placeholder="未设置"
                options={[
                  { label: "缺陷", value: "1" },
                  { label: "需求", value: "2" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="优先级">
              <Select
                defaultValue="0"
                options={[
                  { label: "不指定", value: "0" },
                  { label: "严重", value: "1" },
                  { label: "主要", value: "2" },
                  { label: "次要", value: "3" },
                  { label: "不重要", value: "4" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="置顶">
              <Select
                defaultValue="0"
                options={[
                  { label: "不置顶", value: "0" },
                  { label: "置顶等级：高", value: "1" },
                  { label: "置顶等级：中", value: "2" },
                  { label: "置顶等级：低", value: "3" },
                ]}
              />
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
