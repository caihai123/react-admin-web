import { Select } from "antd";
import dict from "@/utils/dict";

const DictSelect = function (props) {
  const { dictName, placeholder = "请选择", ...rest } = props;

  const { options } = dict[dictName];

  return <Select {...rest} options={options} placeholder={placeholder} />;
};
export default DictSelect;
