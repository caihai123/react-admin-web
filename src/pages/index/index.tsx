import { Row, Col, theme, Alert } from "antd";
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
      <Alert
        message="提示"
        description="本页面只是在样式上完全照抄 Ant Design Pro，但却不是 Ant Design Pro，只是因为我不知道怎么设计一个好看的首页。"
        type="info"
        closable
        showIcon
        style={{ marginBottom: 20 }}
      ></Alert>
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
