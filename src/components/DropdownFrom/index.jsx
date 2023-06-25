import { useState } from "react";
import { Form, Button, Space } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import styled from "styled-components";

const toolsWidth = "188px";

const DropdownBox = styled(Form)`
  position: relative;
  overflow-y: hidden;
  &:after {
    content: "";
    display: inline-block;
    width: ${toolsWidth};
    height: 32px;
    vertical-align: top;
    margin-bottom: 16px;
  }
  & .ant-form-item {
    margin-bottom: 16px;
  }
`;

const ToolsItem = styled(Form.Item)`
  position: absolute;
  right: -16px;
  bottom: 0;
  z-index: 1000;
`;

const DropdownForm = function (props) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const { children, ...rest } = props;

  return (
    <DropdownBox
      layout="inline"
      style={{
        height: visible ? "auto" : "48px",
        paddingRight: visible ? "0" : toolsWidth,
      }}
      form={form}
      {...rest}
    >
      {children}
      <ToolsItem>
        <Space>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
          {visible ? (
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => setVisible(false)}
            >
              收起
              <UpOutlined style={{ marginInlineStart: 0 }} />
            </Button>
          ) : (
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => setVisible(true)}
            >
              展开
              <DownOutlined style={{ marginInlineStart: 0 }} />
            </Button>
          )}
        </Space>
      </ToolsItem>
    </DropdownBox>
  );
};

export default DropdownForm;
