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

const rankingListData = [...Array(7)].map((_, i) => ({
  title: `工专路 ${i} 号店`,
  total: 323234,
}));

const formatNumber = (num) => parseFloat(num).toLocaleString("en-US");

const StyledSalesRank = styled.div`
  margin-bottom: 24px;
  padding: 0 32px;
  & > .rankingList {
    margin: 25px 0 0;
    padding: 0;
    list-style: none;
    & > li {
      display: flex;
      align-items: center;
      margin-top: 16px;
      zoom: 1;
    }
    & .rankingItemNumber {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-top: 1.5px;
      margin-right: 16px;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      background-color: #fafafa;
      border-radius: 20px;
      &.active {
        color: #fff;
        background-color: #314659;
      }
    }

    & .rankingItemTitle {
      flex: 1 1;
      margin-right: 8px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    & span {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

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
                <Col
                  xl={16}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                  style={{ marginBottom: 24 }}
                >
                  <Column
                    height={300}
                    data={salesData}
                    xField="x"
                    yField="y"
                    yAxis={{
                      grid: {
                        line: {
                          style: {
                            stroke: "#8C8C8C",
                          },
                        },
                      },
                    }}
                    meta={{ y: { alias: "销售量" } }}
                    padding={[16, 48, 24, 48]}
                  />
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <StyledSalesRank>
                    <h4>门店销售额排名</h4>
                    <ul className="rankingList">
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`rankingItemNumber ${
                              i < 3 ? "active" : ""
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className="rankingItemTitle" title={item.title}>
                            {item.title}
                          </span>
                          <span>{formatNumber(item.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </StyledSalesRank>
                </Col>
              </Row>
            ),
          },
          {
            label: "访问量",
            key: "views",
            children: (
              <Row>
                <Col
                  xl={16}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                  style={{ marginBottom: 24 }}
                >
                  <Column
                    height={300}
                    data={salesData}
                    xField="x"
                    yField="y"
                    yAxis={{
                      grid: {
                        line: {
                          style: {
                            stroke: "#8C8C8C",
                          },
                        },
                      },
                    }}
                    meta={{ y: { alias: "销售量" } }}
                    padding={[16, 48, 24, 48]}
                  />
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <StyledSalesRank>
                    <h4>门店访问量排名</h4>
                    <ul className="rankingList">
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`rankingItemNumber ${
                              i < 3 ? "active" : ""
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span className="rankingItemTitle" title={item.title}>
                            {item.title}
                          </span>
                          <span>{formatNumber(item.total)}</span>
                        </li>
                      ))}
                    </ul>
                  </StyledSalesRank>
                </Col>
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
