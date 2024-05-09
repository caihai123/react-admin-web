import { forwardRef, useImperativeHandle, useRef } from "react";
import { Space, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import DropdownFrom from "@/components/DropdownFrom";
import DrawerForm from "@/components/DrawerForm";

const QueryForm = forwardRef(function (props, ref) {
  const { layout, children, initialValues, onFinish } = props;

  const dropdownFrom = useRef(null);
  const drawerForm = useRef(null);

  useImperativeHandle(ref, () => ({
    submit: () => {
      dropdownFrom?.current.submit();
      drawerForm?.current.submit();
    },
    reset: () => {
      dropdownFrom?.current.reset();

      // 注意：drawerForm?.current.reset 并不会提交表单，和dropdownFrom不一样，我也有点纠结要不要保持一直
      drawerForm?.current.reset();
    },
  }));

  if (children.length === 0) {
    // 如果没有表单项则不渲染
    return undefined;
  }

  if (layout === "dropdown") {
    return (
      <DropdownFrom
        ref={dropdownFrom}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        {children}
      </DropdownFrom>
    );
  } else {
    return (
      <>
        <Button
          key="filter"
          icon={<FilterOutlined />}
          onClick={() => drawerForm?.current.open()}
        />

        <DrawerForm
          ref={drawerForm}
          title="表格筛选"
          onFinish={(values) => {
            onFinish(values);
            drawerForm?.current.close();
          }}
          initialValues={initialValues}
          footer={
            <div style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => drawerForm?.current.reset()}>
                  重置
                </Button>
                <Button
                  type="primary"
                  onClick={() => drawerForm?.current.submit()}
                >
                  确定
                </Button>
              </Space>
            </div>
          }
        >
          {children}
        </DrawerForm>
      </>
    );
  }
});

export default QueryForm;
