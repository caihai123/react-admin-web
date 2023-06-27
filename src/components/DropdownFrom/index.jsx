import { forwardRef, useImperativeHandle } from "react";
import { Form, Button, Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useBoolean } from "ahooks";

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
  z-index: 10;
`;

const DropdownForm = forwardRef(function (props, ref) {
  const [form] = Form.useForm();
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const { children, ...rest } = props;

  const reset = function () {
    form.resetFields();
    form.submit();
  };

  useImperativeHandle(ref, () => ({
    submit: form.submit,
    reset,
  }));

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
          <Button onClick={() => reset()}>重置</Button>
          {visible ? (
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => setFalse()}
            >
              收起
              <CaretUpOutlined style={{ marginInlineStart: 0 }} />
            </Button>
          ) : (
            <Button
              type="link"
              style={{ padding: 0 }}
              onClick={() => setTrue()}
            >
              展开
              <CaretDownOutlined style={{ marginInlineStart: 0 }} />
            </Button>
          )}
        </Space>
      </ToolsItem>
    </DropdownBox>
  );
});

export default DropdownForm;
