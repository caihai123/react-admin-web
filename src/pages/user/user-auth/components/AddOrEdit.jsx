import { Modal, Form, Input } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";

const AddOrEdit = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    onStart: (id, row = {}) => {
      setVisible(true);
    },
  }));

  // 提交表单
  const submitForm = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
      }, 2000);
    });
  };

  return (
    <Modal
      open={visible}
      title="新增or编辑"
      width={800}
      confirmLoading={loading}
      onCancel={() => setVisible(false)}
      onOk={submitForm}
    >
      <Form form={form}>
        <Form.Item
          label="用户名"
          name="userAccount"
          rules={[{ required: true, message: "请填写用户名!" }]}
          required={false}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: true, message: "请填写手机号!" }]}
          required={false}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddOrEdit;
