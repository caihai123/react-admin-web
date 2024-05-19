import { Select, type SelectProps } from "antd";
import { useRequest } from "ahooks";
import { getRoleSelect } from "@/api/system/role";

/**
 * 角色选择器
 * @param props SelectProps
 */
export default function RoleSelect(props: Omit<SelectProps, "options">) {
  const { data, loading } = useRequest(() =>
    getRoleSelect().then((response) => {
      return response.result;
    })
  );

  return (
    <Select
      options={data}
      placeholder="请选择角色"
      loading={loading}
      filterOption={(inputValue, option) => {
        const label = option?.label as string;
        return label.toLowerCase().includes(inputValue.toLowerCase());
      }}
      {...props}
    ></Select>
  );
}
