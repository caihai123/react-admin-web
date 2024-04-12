import { Button, Card, Radio, Dropdown, Space } from "antd";
import { Pie } from "@ant-design/plots";
import { EllipsisOutlined } from "@ant-design/icons";

import type { PieConfig } from "@ant-design/plots";

const config: PieConfig = {
  height: 400,
  appendPadding: 10,
  data: [
    {
      type: "家用电器",
      value: 4544,
    },
    {
      type: "食用酒水",
      value: 3321,
    },
    {
      type: "个护健康",
      value: 3113,
    },
    {
      type: "服饰箱包",
      value: 2341,
    },
    {
      type: "母婴产品",
      value: 1231,
    },
    {
      type: "其他",
      value: 1231,
    },
  ],
  angleField: "value",
  colorField: "type",
  innerRadius: 0.6,
  label: {
    type: "spider",
    formatter: (_, item) => {
      return `${item._origin.type}: ${item._origin.value}`;
    },
  },
  statistic: {
    title: {
      content: "销售额",
    },
  },
};

const ProportionSales = function () {
  return (
    <Card
      title="销售额类别占比"
      styles={{
        header: { fontWeight: 400, fontSize: 16 },
      }}
      extra={
        <Space>
          <Radio.Group>
            <Radio.Button value="all">全部渠道</Radio.Button>
            <Radio.Button value="online">线上</Radio.Button>
            <Radio.Button value="stores">门店</Radio.Button>
          </Radio.Group>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: "操作一",
                },
                {
                  key: 2,
                  label: "操作二",
                },
              ],
            }}
            placement="bottomRight"
          >
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={<EllipsisOutlined />}
            />
          </Dropdown>
        </Space>
      }
    >
      <Pie {...config} />
    </Card>
  );
};

export default ProportionSales;
