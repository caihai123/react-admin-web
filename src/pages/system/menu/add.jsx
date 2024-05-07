import { useSearchParams, useNavigate } from "react-router-dom";
import {
  App,
  Card,
  Form,
  Row,
  Col,
  TreeSelect,
  Input,
  Space,
  Button,
  Divider,
} from "antd";
import axios from "@/utils/axios";
import { CloseOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useMount, useRequest } from "ahooks";
import DictSelect from "@/components/DictSelect";
import { menuType } from "@/utils/dict";
import { path as pathRule, id as idRule } from "@/utils/rules";

export default function AddMenu() {
  const { modal } = App.useApp();
  const navigate = useNavigate();

  const { data: menuTreeAll } = useRequest(() =>
    axios.get("/api/get-menu-all").then((value) => {
      const { result: data } = value;
      return data;
    })
  );

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();
  const setParentId = () =>
    form.setFieldValue("parentId", searchParams.get("parentId"));
  useMount(setParentId);

  const typeValue = Form.useWatch("type", form);

  const submitAxios = useRequest(
    (values) => axios.post("/api/menu/add", values),
    {
      manual: true,
    }
  );

  return (
    <Card>
      <h1>新增菜单 ✨</h1>
      <Divider></Divider>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: menuType.enum.menu }}
        onFinish={(values) =>
          submitAxios.runAsync(values).then(() => {
            modal.confirm({
              title: "提示",
              icon: <ExclamationCircleFilled />,
              content: "菜单新增成功！",
              okText: "返回列表页",
              onOk: () => navigate("/system/menu"),
              cancelText: "继续新增",
              onCancel: () => {
                form.resetFields();
                setParentId();
              },
              centered: true,
            });
          })
        }
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="父节点" name="parentId" required>
              <TreeSelect
                treeData={menuTreeAll}
                fieldNames={{ label: "title", value: "id" }}
                placeholder="根节点"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={6} lg={12} span={24}>
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
          <Col xxl={6} lg={12} span={24}>
            <Form.Item label="类型" name="type" rules={[{ required: true }]}>
              <DictSelect placeholder="菜单类型" dictName="menuType" />
            </Form.Item>
          </Col>
          {typeValue === menuType.enum.menu && (
            <Col xxl={6} lg={12} span={24}>
              <Form.Item
                label="路径"
                name="path"
                rules={[{ required: true }, pathRule]}
              >
                <Input placeholder="菜单路径" />
              </Form.Item>
            </Col>
          )}
          <Col xxl={6} lg={12} span={24}>
            <Form.Item label="图标" name="icon">
              <Input placeholder="图标名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {typeValue === menuType.enum.menu && (
            <Col xxl={6} lg={12} span={24}>
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
          )}
          <Col span={24}>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitAxios.loading}
                >
                  新增
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    setParentId();
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
