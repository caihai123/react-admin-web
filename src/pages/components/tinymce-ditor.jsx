import { Card } from "antd";

import TinymceDitor from "@/components/TinymceDitor";

export default function Page() {
  return (
    <Card>
      <TinymceDitor autoFocus />
    </Card>
  );
}
