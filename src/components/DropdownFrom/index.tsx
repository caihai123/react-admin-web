import { ReactNode, forwardRef, useImperativeHandle } from "react";
import { Card, Form, Button, Space } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useBoolean } from "ahooks";

import type { FormProps } from "antd";

const toolsWidth = "188px";

const DropdownBox = styled(Form)`
  position: relative;
  overflow-y: hidden;
  padding-top: 16px;
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

const Tools = styled(Form.Item)`
  position: absolute;
  right: -16px;
  bottom: 0;
  z-index: 10;
`;

const DropdownForm = forwardRef(function (
  props: FormProps & { children: ReactNode },
  ref
) {
  const [form] = Form.useForm();
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const { children, style, className, ...rest } = props;

  const reset = function () {
    form.resetFields();
    form.submit();
  };

  useImperativeHandle(ref, () => ({
    submit: form.submit,
    reset,
  }));

  return (
    <Card
      styles={{ body: { paddingTop: 0, paddingBottom: 0 } }}
      style={style}
      className={className}
    >
      <DropdownBox
        layout="inline"
        style={{
          height: visible ? "auto" : "64px",
          paddingRight: visible ? "0" : toolsWidth,
        }}
        form={form}
        {...rest}
      >
        {children}
        <Tools>
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
        </Tools>
      </DropdownBox>
    </Card>
  );
});

export default DropdownForm;
