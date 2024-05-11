import { Select, Badge } from "antd";
import * as dicts from "@/utils/dict";

import type { SelectProps } from "antd";

const allDict: { [key: string]: any } = dicts;

export interface PropsType extends SelectProps {
  dictName: string;
}

const DictSelect = function (props: PropsType) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  const { options } = allDict[dictName];

  return (
    <Select {...rest} placeholder={placeholder}>
      {options.map((item: any) => (
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
