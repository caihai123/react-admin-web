import { Select } from "antd";

export default function IssuePinned(props) {
  return (
    <Select
      options={[
        { label: "不置顶", value: 0 },
        { label: "置顶等级：高", value: 1 },
        { label: "置顶等级：中", value: 2 },
        { label: "置顶等级：低", value: 3 },
      ]}
      {...props}
    ></Select>
  );
}
