import { Alert, Button, Card, Spin, InputNumber, theme } from "antd";
import { useBoolean } from "ahooks";
import useLoadingDelayAndKeep, {
  useLoadingDelay,
  useLoadingKeep,
} from "@/hooks/useLoadingDelayAndKeep";
import { useState } from "react";

const OrdinaryLoading = function ({ duration }) {
  const [loading, { setTrue, setFalse }] = useBoolean(false);
  return (
    <Card title="普通loading" style={{ marginTop: 20 }}>
      <Spin spinning={loading} tip="拼命加载中...">
        <div
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                setTrue();
                setTimeout(setFalse, duration);
              }}
            >
              点击模拟请求
            </Button>
            <div style={{ margin: "16px 0", textAlign: "center" }}>
              当加载时长比较短的时候，loading就会一闪而过。
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
};

const DelayLoading = function ({ duration }) {
  const [loading, { setTrue, setFalse }] = useLoadingDelay(false);

  return (
    <Card title="延时loading（useLoadingDelay）" style={{ marginTop: 20 }}>
      <Spin spinning={loading} tip="拼命加载中...">
        <div
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                setTrue();
                setTimeout(setFalse, duration);
              }}
            >
              点击模拟请求
            </Button>
            <div style={{ margin: "16px 0", textAlign: "center" }}>
              如果加载时间小于500ms，则不会出现loading；如果加载时间大于500ms时，则在500ms后出现loading。
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
};

const KeepLoading = function ({ duration }) {
  const [loading, { setTrue, setFalse }] = useLoadingKeep(false);
  return (
    <Card title="持续loading（useLoadingKeep）" style={{ marginTop: 20 }}>
      <Spin spinning={loading} tip="拼命加载中...">
        <div
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                setTrue();
                setTimeout(setFalse, duration);
              }}
            >
              点击模拟请求
            </Button>
            <div style={{ margin: "16px 0", textAlign: "center" }}>
              不管加载时间多长都一定会出现loading；如果加载时间小于500ms，则会出现持续时间500ms的loading，反之则持续实际时长。
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
};

const DelayAndKeepLoading = function ({ duration }) {
  const [loading, { setTrue, setFalse }] = useLoadingDelayAndKeep(false);
  return (
    <Card
      title="即延时又持续loading（useLoadingDelayAndKeep）"
      style={{ marginTop: 20 }}
    >
      <Spin spinning={loading} tip="拼命加载中...">
        <div
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button
              type="primary"
              onClick={() => {
                setTrue();
                setTimeout(setFalse, duration);
              }}
            >
              点击模拟请求
            </Button>
            <div style={{ margin: "16px 0", textAlign: "center" }}>
              这属于是上面两个的中和，如果加载时长小于500ms,则不会出现loading，如果出现了loading，则一定会持续500ms以上。
            </div>
          </div>
        </div>
      </Spin>
    </Card>
  );
};

export default function Index() {
  const {
    token: { colorBgBase },
  } = theme.useToken();
  const [apiDuration, setApiDuration] = useState(50);

  return (
    <div style={{ height: "100%" }}>
      <Alert message="使用场景：有些时候，当请求返回足够快的情况下，loading 可能会在短时间内完成 false -> true -> false 状态的切换，这时候，加载动画可能会出现闪烁的情况（特别是占满一整屏的动画），这给会用户带来糟糕的体验。" />

      <div style={{ marginTop: 20, padding: 16, backgroundColor: colorBgBase }}>
        <InputNumber
          min={0}
          value={apiDuration}
          onChange={(val) => setApiDuration(val)}
          addonBefore="加载时长"
          addonAfter="单位：ms"
        />
        <div style={{ marginTop: 12 }}>
          设置加载时长后在下面模拟各种loading的效果
        </div>
      </div>

      <OrdinaryLoading duration={apiDuration} />

      <DelayLoading duration={apiDuration} />

      <KeepLoading duration={apiDuration} />

      <DelayAndKeepLoading duration={apiDuration} />
    </div>
  );
}