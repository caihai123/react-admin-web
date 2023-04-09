import { Row, Col, Card, Tooltip, Statistic, theme } from "antd";
import {
  InfoCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { TinyArea, TinyColumn, Progress } from "@ant-design/plots";

const StyledTrend = styled.div`
  display: inline-block;
  font-size: 14px;
  line-height: 22px;
  & > .up,
  .down {
    position: relative;
    margin-left: 4px;
    font-size: 10px;
    transform: scale(0.83);
  }
  & > .up {
    color: #f5222d;
  }
  & > .down {
    top: -1px;
    color: #52c41a;
  }
`;

const Trend = function ({ children, flag, ...rest }) {
  return (
    <StyledTrend {...rest}>
      {children}
      {flag && (
        <span className={flag}>
          {flag === "up" ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </StyledTrend>
  );
};

const formatNumber = (num) => parseFloat(num).toLocaleString("en-US");

const MetaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 22px;
  font-size: 14px;
  color: ${(props) => props.textColor};
  & .action {
    cursor: pointer;
  }
`;

const CardContent = styled.div`
  height: 46px;
  position: relative;
  width: 100%;
  margin-bottom: 12px;
`;
const ContentFixed = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const CardFoot = styled.div`
  margin-top: 8px;
  padding-top: 9px;
  border-top: 1px solid ${(props) => props.borderColor};
`;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 20 },
};

const cardBodyStyle = {
  padding: "20px 24px 8px",
};

const IntroduceRow = function () {
  const {
    token: { colorTextTertiary, colorBorderSecondary },
  } = theme.useToken();

  return (
    <Row gutter={20}>
      <Col {...topColResponsiveProps}>
        <Card bodyStyle={cardBodyStyle}>
          <MetaWrap textColor={colorTextTertiary}>
            <div>总销售额</div>
            <div className="action">
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </MetaWrap>
          <Statistic value={126560} prefix="￥" />
          <CardContent>
            <ContentFixed>
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比 12%
              </Trend>
              <Trend flag="down">日同比 11%</Trend>
            </ContentFixed>
          </CardContent>
          <CardFoot borderColor={colorBorderSecondary}>
            日销售额 ￥{formatNumber(12423)}
          </CardFoot>
        </Card>
      </Col>

      <Col {...topColResponsiveProps}>
        <Card bodyStyle={cardBodyStyle}>
          <MetaWrap textColor={colorTextTertiary}>
            <div>访问量</div>
            <div className="action">
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </MetaWrap>
          <Statistic value={8846} />
          <CardContent>
            <ContentFixed>
              <TinyArea
                color="#975FE4"
                height={46}
                forceFit
                smooth
                data={[7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]}
              />
            </ContentFixed>
          </CardContent>
          <CardFoot borderColor={colorBorderSecondary}>日访问量 1234</CardFoot>
        </Card>
      </Col>

      <Col {...topColResponsiveProps}>
        <Card bodyStyle={cardBodyStyle}>
          <MetaWrap textColor={colorTextTertiary}>
            <div>支付笔数</div>
            <div className="action">
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </MetaWrap>
          <Statistic value={6560} />
          <CardContent>
            <ContentFixed>
              <TinyColumn
                height={46}
                forceFit
                data={[7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]}
              />
            </ContentFixed>
          </CardContent>
          <CardFoot borderColor={colorBorderSecondary}>转化率 60%</CardFoot>
        </Card>
      </Col>

      <Col {...topColResponsiveProps}>
        <Card bodyStyle={cardBodyStyle}>
          <MetaWrap textColor={colorTextTertiary}>
            <div>运营活动效果</div>
            <div className="action">
              <Tooltip title="指标说明">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
          </MetaWrap>
          <Statistic value={78} suffix="%" />
          <CardContent>
            <ContentFixed>
              <Progress
                height={46}
                percent={0.78}
                color="#13C2C2"
                barWidthRatio={0.3}
              />
            </ContentFixed>
          </CardContent>
          <CardFoot borderColor={colorBorderSecondary}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              周同比 12%
            </Trend>
            <Trend flag="down">日同比 11%</Trend>
          </CardFoot>
        </Card>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
