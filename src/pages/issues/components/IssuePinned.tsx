import { Select } from "antd";
import type { GetProps } from "antd";

export type Props = Omit<GetProps<typeof Select>, "options">;

export default function IssuePinned(props: Props) {
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
