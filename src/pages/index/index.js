import { Row, Col, theme } from "antd";
import IntroduceRow from "./components/IntroduceRow";
import SalesCard from "./components/SalesCard";
import ProportionSales from "./components/ProportionSales";
import TopSearch from "./components/TopSearch";

export default function Index() {
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <div style={{ height: "100%", background: colorBgLayout }}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <IntroduceRow />
        </Col>
        <Col span={24}>
          <SalesCard />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <TopSearch />
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <ProportionSales />
        </Col>
      </Row>
    </div>
  );
}
