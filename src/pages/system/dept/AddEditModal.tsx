import React from "react";
import {
  App,
  Modal,
  Form,
  Input,
  TreeSelect,
  Space,
  Button,
  Row,
  Col,
  type FormProps,
} from "antd";
import useLoadingDelayAndKeep from "@/hooks/useLoadingDelayAndKeep";
import {
  useGetDeptSelectQuery,
  useAddDeptItemMutation,
  useUpdateDeptItemMutation,
} from "@/store/api-slice/dept";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import { useBoolean } from "ahooks";

type FieldType = {
  id?: string;
  parentId?: string;
  deptName: string;
  description?: string;
};

export type Props = {
  visible: boolean;
  initialValues?: FormProps<FieldType>["initialValues"];
  onClose?: () => void;
};

const defaultValues = {
  id: "",
  parentId: undefined,
  deptName: "",
  description: "",
};

/** 新增或者编辑的弹窗组件 */
const AddEditModal = function (props: Props) {
  const { message } = App.useApp();

  const [form] = Form.useForm();

  const id = Form.useWatch<FieldType["id"]>("id", form);

  const { data: deptSelectOptions } = useGetDeptSelectQuery();
  const [addDeptItem] = useAddDeptItemMutation();
  const [updateDeptItem] = useUpdateDeptItemMutation();

  React.useEffect(() => {
    // props.initialValues 很有可能是一个空对象或者undefined，这时有的组件不会重置为空，所以需要与defaultValues合并后传入
    form.setFieldsValue({ ...defaultValues, ...props.initialValues });
  }, [form, props.initialValues]);

  const [loading, setLoading] = useLoadingDelayAndKeep(false);

  return (
    <Modal
      title={id ? "编辑" : "新增"}
      width={800}
      open={props.visible}
      centered={true}
      wrapClassName="custom-modal-style"
      maskClosable={false}
      footer={
        <Space>
          <Button onClick={() => props.onClose?.()}>取消</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            确定
          </Button>
        </Space>
      }
      onCancel={() => props.onClose?.()}
    >
      <Form<FieldType>
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => {
          const submitFn = id ? updateDeptItem : addDeptItem;
          const successMsg = id ? "更新成功！" : "新增成功！";
          setLoading.setTrue();
          // @ts-ignore
          submitFn(values)
            .unwrap()
            .then(() => {
              message.success(successMsg);
              props.onClose?.();
            })
            .finally(() => {
              setLoading.setFalse();
            });
        }}
        initialValues={defaultValues}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="父节点" name="parentId" required>
              <TreeSelect
                treeData={deptSelectOptions}
                placeholder="根节点"
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="deptName"
              label="部门名称"
              rules={[{ required: true, message: "请填写部门名称" }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="description" label="备注">
              <Input.TextArea placeholder="请输入" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

/** 控制 AddEditModal 的显示 */
const ManagedModal = function (props: {
  initialValues?: Props["initialValues"];
  content: (set: (v: boolean) => void) => React.ReactNode;
}) {
  const [visible, { set }] = useBoolean(false);
  return (
    <>
      {props.content(set)}
      <AddEditModal
        visible={visible}
        initialValues={props.initialValues}
        onClose={() => set(false)}
      />
    </>
  );
};

export default createCompoundedComponent(AddEditModal, { ManagedModal });
