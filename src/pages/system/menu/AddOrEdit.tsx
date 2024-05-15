import React from "react";
import { Form, Input, App, TreeSelect, Space, Button, Row, Col } from "antd";
import axios from "@/utils/axios";
import ModalForm, { type Ref as ModalFormRef } from "@/components/ModalForm";
import DictSelect from "@/components/DictSelect";
import createCompoundedComponent from "@/components/utils/createCompoundedComponent";
import { CloseOutlined } from "@ant-design/icons";
import { path as pathRule, id as idRule } from "@/utils/rules";
import { menuType } from "@/utils/dict";

import type { Menu } from "@/api/menu";

export type Props = {
  callback: (isAdd: boolean) => void;
  menuTreeAll: Menu[];
};
export type Ref = {
  addStart: (parentId?: string) => void;
  editStart: (row: Menu) => void;
};

const AddOrEdit = React.forwardRef<Ref, Props>((props, ref) => {
  const { message } = App.useApp();

  const [id, setId] = React.useState("");

  const modalFormRef = React.useRef<ModalFormRef>(null);
  const [form] = Form.useForm();

  const typeValue = Form.useWatch("type", form);

  React.useImperativeHandle(ref, () => ({
    addStart: (parentId) => {
      form.setFieldValue("parentId", parentId);
      modalFormRef.current?.open();
    },
    editStart: (row) => {
      setId(row.id);
      form.setFieldsValue(row);
      modalFormRef.current?.open();
    },
  }));

  return (
    <ModalForm
      ref={modalFormRef}
      form={form}
      title={id ? "编辑" : "新增"}
      width={800}
      afterClose={() => {
        setId("");
        form.resetFields();
      }}
      initialValues={{ type: menuType.enum.menu }}
      onFinish={(values) => {
        const apiUrl = id ? "/api/menu/update" : "/api/menu/add";
        const successMsg = id ? "更新成功！" : "新增成功！";
        const params = id ? { id, ...values } : values;
        return axios.post(apiUrl, params).then(() => {
          message.success(successMsg);
          props.callback(!id);
        });
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="父节点" name="parentId" required>
            <TreeSelect
              treeData={props.menuTreeAll}
              fieldNames={{ label: "title", value: "id" }}
              placeholder="根节点"
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="名称"
            name="title"
            rules={[
              { required: true },
              {
                type: "string",
                min: 2,
                max: 10,
                message: "长度在 2 到 10 个字符！",
              },
            ]}
          >
            <Input placeholder="菜单名称" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="类型" name="type" rules={[{ required: true }]}>
            <DictSelect placeholder="菜单类型" dictName="menuType" />
          </Form.Item>
        </Col>
        {typeValue === menuType.enum.menu && (
          <Col span={12}>
            <Form.Item
              label="路径"
              name="path"
              rules={[{ required: true }, pathRule]}
            >
              <Input placeholder="菜单路径" />
            </Form.Item>
          </Col>
        )}
        <Col span={12}>
          <Form.Item label="图标" name="icon">
            <Input placeholder="图标名称" />
          </Form.Item>
        </Col>
      </Row>
      {typeValue === menuType.enum.menu && (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="按钮">
              <Form.List name="buttonList">
                {(buttonList, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {buttonList.map(({ key, name }) => (
                      <Space key={key} align="baseline">
                        <Form.Item
                          name={[name, "name"]}
                          rules={[
                            {
                              required: true,
                              message: "按钮名称是必选字段",
                            },
                          ]}
                        >
                          <Input placeholder="按钮名称" />
                        </Form.Item>
                        <Form.Item
                          name={[name, "id"]}
                          rules={[
                            {
                              required: true,
                              message: "按钮标识是必选字段",
                            },
                            idRule,
                          ]}
                        >
                          <Input placeholder="按钮标识" />
                        </Form.Item>
                        <CloseOutlined onClick={() => subOpt.remove(name)} />
                      </Space>
                    ))}
                    <Button type="dashed" onClick={() => subOpt.add()} block>
                      + 新增按钮
                    </Button>
                  </div>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
      )}
    </ModalForm>
  );
});

// 可以稍微减少使用时的代码量
const useModal: (props: Props) => [React.RefObject<Ref>, React.ReactElement] =
  function (props) {
    const ref = React.useRef<Ref>(null);

    return [ref, <AddOrEdit ref={ref} {...props} />];
  };

export default createCompoundedComponent(AddOrEdit, { useModal });
