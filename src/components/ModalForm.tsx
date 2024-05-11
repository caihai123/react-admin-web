import { forwardRef, useImperativeHandle, type ReactNode } from "react";
import { useBoolean } from "ahooks";
import { Modal, Form, Space, Button } from "antd";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";

import type { ModalProps, FormProps, FormInstance } from "antd";

export type Ref = {
  /** 打开 Modal */
  open: () => void;
  /** 关闭 Modal */
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
  title?: ModalProps["title"];
  /** Drawer width */
  width?: ModalProps["width"];
  /** 确认按钮文字 默认：确定 */
  submitText?: ReactNode;
  /** 取消按钮文字 默认：取消 */
  cancelText?: ReactNode;
  /** 提交表单后触发的事件 */
  onFinish?: ((values: any) => void | Promise<any>) | undefined;
  /** Drawer 底部内容，当不需要默认底部按钮时，可以设为 footer={null} 默认：确定取消按钮 */
  footer?: ModalProps["footer"];
  /** 表单默认值 */
  initialValues?: FormProps["initialValues"];
  // Modal 完全关闭后的回调
  afterClose?: ModalProps["afterClose"];
  /** Modal 其他属性 优先级较高，可能会覆盖title，width等属性 */
  modalProps?: ModalProps;
  /** Form 其他属性 优先级较高，可能会覆盖onFinish，initialValues等属性 */
  formProps?: FormProps;
};

/**
 * Modal 和 Form 的组合，方便在 Modal 中快速创建表单
 */
const ModalForm = forwardRef<Ref, Props>(function (props, ref) {
  const {
    title,
    width,
    submitText = "确定",
    cancelText = "取消",
    children,
    modalProps,
    formProps,
    onFinish,
    footer,
    initialValues,
    afterClose,
  } = props;

  const [form] = Form.useForm();
  const [open, { set: setOpen }] = useBoolean(false);

  const [loading, setLoading] = useLoadingDelayAndKeep(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
    reset: form.resetFields,
    submit: form.submit,
    formInstance: form,
  }));

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => setOpen(false)}
      width={width}
      footer={
        footer ? (
          footer
        ) : (
          <Space>
            <Button onClick={() => setOpen(false)}>{cancelText}</Button>
            <Button
              type="primary"
              loading={loading}
              onClick={() => form.submit()}
            >
              {submitText}
            </Button>
          </Space>
        )
      }
      centered={true}
      wrapClassName="custom-modal-style"
      maskClosable={false}
      style={{ marginTop: "-20vh" }}
      afterClose={afterClose}
      {...modalProps}
    >
      <Form
        form={form}
        autoComplete="off"
        onFinish={(values) => {
          const fnResult = onFinish?.(values);
          if (fnResult instanceof Promise) {
            setLoading.setTrue();
            fnResult.then(() => setOpen(false));
            fnResult.finally(() => setLoading.setFalse());
          }
        }}
        layout="vertical"
        initialValues={initialValues}
        {...formProps}
      >
        {children}
      </Form>
    </Modal>
  );
});

export default ModalForm;
