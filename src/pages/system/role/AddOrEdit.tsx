import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, App } from "antd";
import axios from "@/utils/axios";
import ModalForm, { type Ref as ModalFormRef } from "@/components/ModalForm";
import { Role } from "@/api/role";

export type Props = {
  callback: (pageIndex?: number) => void;
};
export type Ref = {
  addStart: () => void;
  editStart: (row: Role) => void;
};

const AddOrEdit = forwardRef<Ref, Props>((props, ref) => {
  const { message } = App.useApp();

  const modalFormRef = useRef<ModalFormRef>(null);

  const [id, setId] = useState("");

  const onSubmit = function (data: Pick<Role, "roleName" | "description">) {
    const apiUrl = id ? "/api/role/update" : "/api/role/add";
    const successMsg = id ? "更新成功！" : "新增成功！";
    const params = id ? { id, ...data } : data;
    const callback = () => props.callback?.(id ? undefined : 1);
    return axios.post(apiUrl, params).then(() => {
      message.success(successMsg);
      callback();
    });
  };

  useImperativeHandle(ref, () => ({
    addStart: () => modalFormRef.current?.open(),
    editStart: (row) => {
      setId(row.id);
      modalFormRef.current?.formInstance.setFieldsValue(row);
      modalFormRef.current?.open();
    },
  }));

  return (
    <ModalForm
      ref={modalFormRef}
      title={id ? "编辑" : "新增"}
      width={600}
      afterClose={() => {
        setId("");
        modalFormRef.current?.formInstance.resetFields();
      }}
      onFinish={onSubmit}
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
    </ModalForm>
  );
});

export default AddOrEdit;
