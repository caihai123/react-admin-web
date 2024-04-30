import { Select, Badge } from "antd";
import dict from "@/utils/dict";

const DictSelect = function (props) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  const { options } = dict[dictName];

  return (
    <Select {...rest} options={options} placeholder={placeholder}>
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
