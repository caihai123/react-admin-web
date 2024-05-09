import { forwardRef, useImperativeHandle } from "react";
import { useBoolean } from "ahooks";
import { Drawer, Form, Space, Button } from "antd";

/**
 * Drawer 和 Form 的组合，方便在 Drawer 中快速创建表单
 */
const DrawerForm = forwardRef(function (props, ref) {
  const {
    title,
    width,
    submitText = "确定",
    cancelText = "取消",
    children,
    drawerProps,
    formProps,
    onFinish,
    footer,
    initialValues,
  } = props;

  const [form] = Form.useForm();
  const [open, { setTrue, setFalse }] = useBoolean(false);

  useImperativeHandle(ref, () => ({
    open: () => setTrue(),
    close: () => setFalse(),
    reset: form.resetFields,
    submit: form.submit,
  }));

  return (
    <Drawer
      title={title}
      open={open}
      onClose={() => setFalse()}
      width={width}
      footer={
        footer ? (
          footer
        ) : (
          <div style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={() => setFalse()}>{cancelText}</Button>
              <Button type="primary" onClick={() => form.submit()}>
                {submitText}
              </Button>
            </Space>
          </div>
        )
      }
      {...drawerProps}
    >
      <Form
        form={form}
        autoComplete="off"
        onFinish={(values) => onFinish(values)?.then(() => setFalse())}
        layout="vertical"
        initialValues={initialValues}
        {...formProps}
      >
        {children}
      </Form>
    </Drawer>
  );
});

export default DrawerForm;
