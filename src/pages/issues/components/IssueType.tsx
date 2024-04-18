import { Select, Badge } from "antd";
import type { GetProps } from "antd";

export type Props = Omit<GetProps<typeof Select>, "options">;

const { Option } = Select;

export default function IssuePinned(props: Props) {
  return (
    <Select {...props}>
      <Option value={1}>
        <Badge status="error" text="缺陷" />
      </Option>
      <Option value={2}>
        <Badge status="success" text="需求" />
      </Option>
    </Select>
  );
}
