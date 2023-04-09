import { Row, Col, Card, theme } from "antd";
import IntroduceRow from "./components/IntroduceRow";
import SalesCard from "./components/SalesCard";

const index = function () {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <div style={{ height: "100%", background: colorBgLayout }}>
      <IntroduceRow />

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <SalesCard />
        </Col>
        <Col span={12}>
          <Card
            title="线上热门搜索"
            headStyle={{
              fontWeight: 400,
              fontSize: 16,
            }}
          ></Card>
        </Col>
        <Col span={12}>
          <Card
            title="销售额类别占比"
            headStyle={{
              fontWeight: 400,
              fontSize: 16,
            }}
          ></Card>
        </Col>
        <Col span={24}>
          <Card></Card>
        </Col>
      </Row>
    </div>
  );
};

export default index;
