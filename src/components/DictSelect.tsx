import { Select, Badge } from "antd";
import dict from "@/utils/dict";

import type { SelectProps } from "antd";

export interface PropsType extends SelectProps {
  dictName: string;
}

const DictSelect = function (props: PropsType) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  const { options } = dict[dictName];

  return (
    <Select {...rest} placeholder={placeholder}>
      {options.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.color ? (
            <Badge color={item.color} text={item.label} />
          ) : (
            item.label
          )}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DictSelect;
