import { Result, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();

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
          <Space>
            <Button onClick={() => navigate(-1)}>返回上一页</Button>
            <Button type="primary" onClick={() => navigate("/")}>
              回到首页
            </Button>
          </Space>
        }
      />
    </div>
  );
}
