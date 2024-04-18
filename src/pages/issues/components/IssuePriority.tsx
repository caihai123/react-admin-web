import { Select, Badge, theme } from "antd";
import type { GetProps } from "antd";

export type Props = Omit<GetProps<typeof Select>, "options">;

const { Option } = Select;

export default function IssuePinned(props: Props) {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Select {...props}>
      <Option value={0}>
        <Badge status="default" text="不指定" />
      </Option>
      <Option value={1}>
        <Badge status="error" text="严重" />
      </Option>
      <Option value={2}>
        <Badge color={colorPrimary} text="主要" />
      </Option>
      <Option value={3}>
        <Badge status="warning" text="次要" />
      </Option>
      <Option value={4}>
        <Badge status="success" text="不重要" />
      </Option>
    </Select>
  );
}
