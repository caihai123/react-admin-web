import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page() {
  let navigate = useNavigate();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            回到首页
          </Button>
        }
      />
    </div>
  );
}
