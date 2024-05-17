import React from "react";
import { Form, Input, App } from "antd";
import axios from "@/utils/axios";
import ModalForm from "@/components/ModalForm";
import { Role } from "@/api/system/role";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";

export type Props = {
  callback: (pageIndex?: number) => void;
};
export type Ref = {
  addStart: () => void;
  editStart: (row: Role) => void;
};

const AddOrEdit = React.forwardRef<Ref, Props>((props, ref) => {
  const { message } = App.useApp();

  const [id, setId] = React.useState("");

  const onSubmit = function (data: Pick<Role, "roleName" | "description">) {
    const apiUrl = id ? "/api/role/update" : "/api/role/add";
    const successMsg = id ? "更新成功！" : "新增成功！";
    const params = id ? { id, ...data } : data;
    const callback = () => props.callback(id ? undefined : 1);
    return axios.post(apiUrl, params).then(() => {
      message.success(successMsg);
      callback();
    });
  };

  const [modalFormRef, formInstance, contextHolder] = ModalForm.useModal({
    title: id ? "编辑" : "新增",
    width: 600,
    afterClose: () => {
      setId("");
      formInstance?.resetFields();
    },
    onFinish: onSubmit,
    children: (
      <>
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
      </>
    ),
  });

  React.useImperativeHandle(ref, () => ({
    addStart: () => modalFormRef.current?.open(),
    editStart: (row) => {
      setId(row.id);
      formInstance?.setFieldsValue(row);
      modalFormRef.current?.open();
    },
  }));

  return contextHolder;
});

// 可以稍微减少使用时的代码量
const useModal: (props: Props) => [React.RefObject<Ref>, React.ReactElement] =
  function (props) {
    const ref = React.useRef<Ref>(null);

    return [ref, <AddOrEdit ref={ref} {...props} />];
  };

export default createCompoundedComponent(AddOrEdit, { useModal });
