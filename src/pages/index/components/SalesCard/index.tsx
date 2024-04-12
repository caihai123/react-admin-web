/* eslint-disable jsx-a11y/anchor-is-valid */
import { Card, Tabs, DatePicker, Space, Row, Col } from "antd";
import { Column } from "@ant-design/plots";
import styles from "./style.module.css";

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

const formatNumber = (num: string | number) =>
  parseFloat(`${num}`).toLocaleString("en-US");

const SalesCard = function () {
  return (
    <Card bordered={false} styles={{ body: { padding: 0 } }}>
      <Tabs
        tabBarExtraContent={
          <Space style={{ paddingRight: 16 }}>
            <div className={styles.salesExtra}>
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
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
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${
                              i < 3 ? styles.active : ""
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={styles.rankingItemTitle}
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {formatNumber(item.total)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                    <ul className={styles.rankingList}>
                      {rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${
                              i < 3 ? styles.active : ""
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={styles.rankingItemTitle}
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {formatNumber(item.total)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
