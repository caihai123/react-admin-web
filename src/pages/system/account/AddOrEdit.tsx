import React from "react";
import { Form, Input, App, TreeSelect } from "antd";
import axios from "@/utils/axios";
import ModalForm from "@/components/ModalForm";
import { Account } from "@/api/system/account";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import { useGetDeptSelectQuery } from "@/store/api-slice/dept";
import RoleSelect from "@/components/RoleSelect";

export type Props = {
  callback: (pageIndex?: number) => void;
};
export type Ref = {
  addStart: () => void;
  editStart: (row: Account) => void;
};

const AddOrEdit = React.forwardRef<Ref, Props>((props, ref) => {
  const { message } = App.useApp();

  const [id, setId] = React.useState("");

  const { data: depeOptions } = useGetDeptSelectQuery();

  const onSubmit = function (data: {
    account: string;
    password: string;
    deptId: string;
    role: string[];
  }) {
    const apiUrl = id ? "/api/account/update" : "/api/account/add";
    const successMsg = id ? "更新成功！" : "新增成功！";
    const params = id ? { id, ...data } : data;
    const callback = () => props.callback(id ? undefined : 1);
    return axios.post(apiUrl, params).then(() => {
      message.success(successMsg);
      callback();
    });
  };

  const [title, setTitle] = React.useState("");

  const [modalFormRef, formInstance, contextHolder] = ModalForm.useModal({
    title,
    width: 600,
    afterClose: () => {
      setId("");
      formInstance?.resetFields();
    },
    onFinish: onSubmit,
    children: (
      <>
        <Form.Item name="account" label="账号" rules={[{ required: true }]}>
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        {!id && (
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password placeholder="请输入" allowClear />
          </Form.Item>
        )}
        <Form.Item name="deptId" label="部门" rules={[{ required: true }]}>
          <TreeSelect treeData={depeOptions} placeholder="请选择" allowClear />
        </Form.Item>
        <Form.Item name="role" label="角色" rules={[{ required: true }]}>
          <RoleSelect mode="multiple" allowClear maxTagCount={3} />
        </Form.Item>
      </>
    ),
  });

  React.useImperativeHandle(ref, () => ({
    addStart: () => {
      setTitle(`新增用户`);
      modalFormRef.current?.open();
    },
    editStart: (row) => {
      setTitle(`更新【${row.name}】的信息`);
      setId(row.id);
      const initialValues = {
        account: row.account,
        deptId: row.deptId,
        role: row.role?.map((item) => item.id),
      };
      formInstance?.setFieldsValue(initialValues);
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
