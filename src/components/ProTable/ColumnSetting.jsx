import { useState } from "react";
import { Popover, Checkbox, Divider, Button } from "antd";

const ColumnSetting = function (props) {
  const { children, value, onChange, options } = props;

  const plainOptions = options.map((item) => item.value);

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

  const onCheckAllChange = (e) => {
    onChange(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onCheckChange = (list) => {
    onChange(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  return (
    <Popover
      arrow={false}
      content={
        <div style={{ minWidth: 176 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              列展示
            </Checkbox>
            <Button
              type="link"
              style={{ height: 22, lineHeight: 1, padding: 0 }}
              onClick={() => onCheckChange(plainOptions)}
            >
              重置
            </Button>
          </div>
          <Divider style={{ margin: "4px 0" }} />
          <Checkbox.Group
            value={value}
            onChange={(keys) => onCheckChange(keys)}
            style={{ display: "block" }}
          >
            {options.map((item) => (
              <Checkbox
                style={{ display: "flex", margin: 0 }}
                value={item.value}
                key={item.value}
              >
                {item.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      }
      placement="bottomRight"
      trigger="click"
    >
      {children}
    </Popover>
  );
};
export default ColumnSetting;
