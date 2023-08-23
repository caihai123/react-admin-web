import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Space, Button, Form, Input, App } from "antd";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";
import axios from "@/utils/axios";

const AddOrEdit = forwardRef((props, ref) => {
  const { message } = App.useApp();

  const [headForm] = Form.useForm();

  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, { setTrue, setFalse }] = useLoadingDelayAndKeep(false);

  const onSubmit = function (data) {
    setTrue(true);
    const apiUrl = id ? "/api/role/update" : "/api/role/add";
    const successMsg = id ? "更新成功！" : "新增成功！";
    const params = id ? { id, ...data } : data;
    const callback = () => props.callback?.(id ? undefined : 1);
    axios
      .post(apiUrl, params)
      .then(() => {
        setVisible(false);
        message.success(successMsg);
        callback();
      })
      .finally(() => setFalse());
  };

  useImperativeHandle(ref, () => ({
    addStart: () => setVisible(true),
    editStart: (row) => {
      setId(row.id);
      headForm.setFieldsValue(row);
      setVisible(true);
    },
  }));

  return (
    <Modal
      title={id ? "编辑" : "新增"}
      open={visible}
      width={600}
      footer={
        <Space>
          <Button onClick={() => setVisible(false)}>取消</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => headForm.submit()}
          >
            确定
          </Button>
        </Space>
      }
      onCancel={() => setVisible(false)}
      afterClose={() => {
        setId("");
        headForm.resetFields();
      }}
    >
      <Form
        form={headForm}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="roleName"
          label="角色名称"
          rules={[{ required: true, message: "请填写角色名称" }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="description" label="备注">
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default AddOrEdit;
