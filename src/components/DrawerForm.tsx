import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useBoolean } from "ahooks";
import { Drawer, Form, Space, Button } from "antd";

import type { DrawerProps, FormProps, FormInstance } from "antd";

export type Ref = {
  /** 打开 Drawer */
  open: () => void;
  /** 关闭 Drawer */
  close: () => void;
  /** 重置表单 */
  reset: () => void;
  /** 提交表单 */
  submit: () => void;
  /** FormInstance */
  formInstance: FormInstance<any>;
};

export type Props = {
  /** 表单内容 */
  children?: ReactNode;
  /** Drawer title */
  title?: DrawerProps["title"];
  /** Drawer width */
  width?: DrawerProps["width"];
  /** 确认按钮文字 默认：确定 */
  submitText?: ReactNode;
  /** 取消按钮文字 默认：取消 */
  cancelText?: ReactNode;
  /** 提交表单后触发的事件 */
  onFinish?: ((values: any) => void | Promise<any>) | undefined;
  /** Drawer 底部内容，当不需要默认底部按钮时，可以设为 footer={null} 默认：确定取消按钮 */
  footer?: DrawerProps["footer"];
  /** 表单默认值 */
  initialValues?: FormProps["initialValues"];
  /** Drawer 其他属性 优先级较高，可能会覆盖title，width等属性 */
  drawerProps?: DrawerProps;
  /** Form 其他属性 优先级较高，可能会覆盖onFinish，initialValues等属性 */
  formProps?: FormProps;
};

/**
 * Drawer 和 Form 的组合，方便在 Drawer 中快速创建表单
 */
const DrawerForm = forwardRef<Ref, Props>(function (props, ref) {
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
    formInstance: form,
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
        onFinish={(values) =>
          onFinish && onFinish(values)?.then(() => setFalse())
        }
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
