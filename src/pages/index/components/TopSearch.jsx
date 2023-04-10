import { Card, Row, Col, Table, Statistic, Tooltip, theme } from "antd";
import Trend from "@/components/Trend";
import { TinyArea } from "@ant-design/plots";
import { InfoCircleOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "排名",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "搜索关键词",
    dataIndex: "keyword",
    key: "keyword",
    render: (text) => <a href="/">{text}</a>,
  },
  {
    title: "用户数",
    dataIndex: "count",
    key: "count",
    sorter: (a, b) => a.count - b.count,
  },
  {
    title: "周涨幅",
    dataIndex: "range",
    key: "range",
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? "down" : "up"}>
        <span style={{ marginRight: 4 }}>{text}%</span>
      </Trend>
    ),
  },
];

const searchData = [
  {
    index: 1,
    keyword: "搜索关键词-0",
    count: 527,
    range: 59,
    status: 1,
  },
  {
    index: 2,
    keyword: "搜索关键词-1",
    count: 532,
    range: 41,
    status: 0,
  },
  {
    index: 3,
    keyword: "搜索关键词-2",
    count: 311,
    range: 9,
    status: 0,
  },
  {
    index: 4,
    keyword: "搜索关键词-3",
    count: 675,
    range: 85,
    status: 0,
  },
  {
    index: 5,
    keyword: "搜索关键词-4",
    count: 173,
    range: 88,
    status: 1,
  },
  {
    index: 6,
    keyword: "搜索关键词-5",
    count: 91,
    range: 0,
    status: 0,
  },
  {
    index: 7,
    keyword: "搜索关键词-6",
    count: 80,
    range: 81,
    status: 1,
  },
  {
    index: 8,
    keyword: "搜索关键词-7",
    count: 391,
    range: 55,
    status: 1,
  },
  {
    index: 9,
    keyword: "搜索关键词-8",
    count: 169,
    range: 78,
    status: 0,
  },
  {
    index: 10,
    keyword: "搜索关键词-9",
    count: 825,
    range: 25,
    status: 1,
  },
  {
    index: 11,
    keyword: "搜索关键词-10",
    count: 163,
    range: 53,
    status: 0,
  },
  {
    index: 12,
    keyword: "搜索关键词-11",
    count: 813,
    range: 46,
    status: 0,
  },
  {
    index: 13,
    keyword: "搜索关键词-12",
    count: 622,
    range: 94,
    status: 0,
  },
  {
    index: 14,
    keyword: "搜索关键词-13",
    count: 804,
    range: 87,
    status: 1,
  },
  {
    index: 15,
    keyword: "搜索关键词-14",
    count: 441,
    range: 77,
    status: 0,
  },
  {
    index: 16,
    keyword: "搜索关键词-15",
    count: 965,
    range: 39,
    status: 0,
  },
  {
    index: 17,
    keyword: "搜索关键词-16",
    count: 719,
    range: 78,
    status: 0,
  },
  {
    index: 18,
    keyword: "搜索关键词-17",
    count: 434,
    range: 43,
    status: 0,
  },
  {
    index: 19,
    keyword: "搜索关键词-18",
    count: 786,
    range: 89,
    status: 1,
  },
  {
    index: 20,
    keyword: "搜索关键词-19",
    count: 351,
    range: 47,
    status: 0,
  },
  {
    index: 21,
    keyword: "搜索关键词-20",
    count: 976,
    range: 34,
    status: 1,
  },
  {
    index: 22,
    keyword: "搜索关键词-21",
    count: 521,
    range: 54,
    status: 1,
  },
  {
    index: 23,
    keyword: "搜索关键词-22",
    count: 374,
    range: 41,
    status: 1,
  },
  {
    index: 24,
    keyword: "搜索关键词-23",
    count: 938,
    range: 27,
    status: 0,
  },
  {
    index: 25,
    keyword: "搜索关键词-24",
    count: 315,
    range: 88,
    status: 1,
  },
  {
    index: 26,
    keyword: "搜索关键词-25",
    count: 172,
    range: 82,
    status: 1,
  },
  {
    index: 27,
    keyword: "搜索关键词-26",
    count: 177,
    range: 59,
    status: 0,
  },
  {
    index: 28,
    keyword: "搜索关键词-27",
    count: 498,
    range: 49,
    status: 0,
  },
  {
    index: 29,
    keyword: "搜索关键词-28",
    count: 388,
    range: 3,
    status: 1,
  },
  {
    index: 30,
    keyword: "搜索关键词-29",
    count: 213,
    range: 58,
    status: 1,
  },
  {
    index: 31,
    keyword: "搜索关键词-30",
    count: 108,
    range: 56,
    status: 1,
  },
  {
    index: 32,
    keyword: "搜索关键词-31",
    count: 589,
    range: 73,
    status: 1,
  },
  {
    index: 33,
    keyword: "搜索关键词-32",
    count: 210,
    range: 43,
    status: 1,
  },
  {
    index: 34,
    keyword: "搜索关键词-33",
    count: 339,
    range: 42,
    status: 0,
  },
  {
    index: 35,
    keyword: "搜索关键词-34",
    count: 673,
    range: 71,
    status: 1,
  },
  {
    index: 36,
    keyword: "搜索关键词-35",
    count: 10,
    range: 7,
    status: 0,
  },
  {
    index: 37,
    keyword: "搜索关键词-36",
    count: 24,
    range: 76,
    status: 0,
  },
  {
    index: 38,
    keyword: "搜索关键词-37",
    count: 452,
    range: 20,
    status: 0,
  },
  {
    index: 39,
    keyword: "搜索关键词-38",
    count: 175,
    range: 24,
    status: 0,
  },
  {
    index: 40,
    keyword: "搜索关键词-39",
    count: 307,
    range: 87,
    status: 1,
  },
  {
    index: 41,
    keyword: "搜索关键词-40",
    count: 910,
    range: 8,
    status: 1,
  },
  {
    index: 42,
    keyword: "搜索关键词-41",
    count: 895,
    range: 30,
    status: 1,
  },
  {
    index: 43,
    keyword: "搜索关键词-42",
    count: 839,
    range: 78,
    status: 1,
  },
  {
    index: 44,
    keyword: "搜索关键词-43",
    count: 16,
    range: 24,
    status: 1,
  },
  {
    index: 45,
    keyword: "搜索关键词-44",
    count: 513,
    range: 91,
    status: 0,
  },
  {
    index: 46,
    keyword: "搜索关键词-45",
    count: 573,
    range: 19,
    status: 0,
  },
  {
    index: 47,
    keyword: "搜索关键词-46",
    count: 705,
    range: 13,
    status: 0,
  },
  {
    index: 48,
    keyword: "搜索关键词-47",
    count: 432,
    range: 60,
    status: 0,
  },
  {
    index: 49,
    keyword: "搜索关键词-48",
    count: 519,
    range: 2,
    status: 1,
  },
  {
    index: 50,
    keyword: "搜索关键词-49",
    count: 815,
    range: 66,
    status: 1,
  },
];

const TopSearch = function () {
  const {
    token: { colorTextSecondary },
  } = theme.useToken();
  const labelStyles = {
    height: 22,
    overflow: "hidden",
    color: colorTextSecondary,
    fontSize: 14,
    lineHeight: 1,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    wordBreak: "break-all",
  };
  return (
    <Card
      title="线上热门搜索"
      headStyle={{
        fontWeight: 400,
        fontSize: 16,
      }}
      bodyStyle={{ height: 448 }}
    >
      <Row gutter={[20, 20]}>
        <Col sm={12} xs={24}>
          <div style={labelStyles}>
            搜索用户数
            <Tooltip title="指标说明">
              <InfoCircleOutlined style={{ marginLeft: 8 }} />
            </Tooltip>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Statistic value={12312} valueStyle={{ marginRight: 32 }} />
            <Trend flag="up">
              <span>17.1</span>
            </Trend>
          </div>
          <TinyArea
            height={46}
            forceFit
            smooth
            data={[7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]}
          />
        </Col>
        <Col sm={12} xs={24}>
          <div style={labelStyles}>
            人均搜索次数
            <Tooltip title="指标说明">
              <InfoCircleOutlined style={{ marginLeft: 8 }} />
            </Tooltip>
          </div>
          <div
            style={{
              display: "flex",

              alignItems: "center",
            }}
          >
            <Statistic value={2.7} valueStyle={{ marginRight: 32 }} />
            <Trend flag="down">
              <span>26.2</span>
            </Trend>
          </div>

          <TinyArea
            height={46}
            forceFit
            smooth
            data={[7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]}
          />
        </Col>
        <Col span={24}>
          <Table
            rowKey={(record) => record.index}
            size="small"
            columns={columns}
            dataSource={searchData}
            pagination={{
              style: { marginBottom: 0 },
              pageSize: 5,
            }}
          ></Table>
        </Col>
      </Row>
    </Card>
  );
};

export default TopSearch;
