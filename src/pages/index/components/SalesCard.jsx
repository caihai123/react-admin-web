import { Card, Tabs, DatePicker, Space, Row, Col } from "antd";
import styled from "styled-components";
import { Column } from "@ant-design/plots";

const SalesExtra = styled.div`
  display: inline-block;
  margin-right: 24px;
  & > a {
    margin-left: 24px;
  }
`;

const salesData = [
  {
    x: "1月",
    y: 567,
  },
  {
    x: "2月",
    y: 759,
  },
  {
    x: "3月",
    y: 1003,
  },
  {
    x: "4月",
    y: 808,
  },
  {
    x: "5月",
    y: 234,
  },
  {
    x: "6月",
    y: 643,
  },
  {
    x: "7月",
    y: 1137,
  },
  {
    x: "8月",
    y: 330,
  },
  {
    x: "9月",
    y: 1190,
  },
  {
    x: "10月",
    y: 455,
  },
  {
    x: "11月",
    y: 944,
  },
  {
    x: "12月",
    y: 892,
  },
];

const SalesCard = function () {
  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <Tabs
        tabBarExtraContent={
          <Space style={{ paddingRight: 16 }}>
            <SalesExtra>
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </SalesExtra>
            <DatePicker.RangePicker style={{ width: 256 }} />
          </Space>
        }
        items={[
          {
            label: "销售额",
            key: "sales",
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <Column
                    height={300}
                    data={salesData}
                    xField="x"
                    yField="y"
                    meta={{ y: { alias: "销售量" } }}
                    padding={[16, 48, 48, 48]}
                  />
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}></Col>
              </Row>
            ),
          },
          {
            label: "访问量",
            key: "views",
            children: (
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <Column
                    height={300}
                    data={salesData}
                    xField="x"
                    yField="y"
                    meta={{ y: { alias: "销售量" } }}
                    padding={[16, 48, 48, 48]}
                  />
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}></Col>
              </Row>
            ),
          },
        ]}
        size="large"
        tabBarStyle={{ marginBottom: 24, paddingLeft: 16 }}
      />
    </Card>
  );
};

export default SalesCard;
