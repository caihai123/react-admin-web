import { useState, useEffect } from "react";
import { Layout, Button, Form, Input, theme, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import LoginBanner from "@/components/LoginBanner";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme } from "@/store/modules/system";
import styled from "styled-components";

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  background: ${(props) => props.background};
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 9;
`;

function Login() {
  // 验证码相关 start
  const [authCode, setAuthCode] = useState(["", ""]);
  const getAuthCode = () => {
    const codeId = Math.ceil(Math.random() * 10000);
    axios
      .get(`/api/core/sys/login/verification/code?codeId=${codeId}`)
      .then((value) => {
        setAuthCode([value.data, codeId]);
      });
  };
  useEffect(() => {
    getAuthCode();
  }, []);
  // 验证码相关 end

  // 换肤相关 start
  const dispatch = useDispatch();
  const themeName = useSelector(selectTheme);
  // 换肤相关 end

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const submitForm = (values) => {
    setLoading(true);
    const codeId = authCode[1];
    axios
      .post("/api/core/sys/login", { ...values, codeId })
      .then((value) => {
        const { token } = value.data;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch(() => {
        getAuthCode(); // 更新验证码
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    token: { colorBgBase, colorBgLayout, colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header background={colorBgBase}>
        <h1 style={{ fontSize: 24 }}>公共服务管理平台</h1>
        <div className="tools">
          <Switch
            checked={themeName !== "dark"}
            checkedChildren="🌜"
            unCheckedChildren="🌞"
            onClick={() => dispatch(setTheme())}
          />
        </div>
      </Header>
      <Layout>
        <Layout.Sider
          theme="light"
          width="60%"
          style={{ padding: 24, background: colorBgLayout }}
        >
          <LoginBanner />
        </Layout.Sider>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colorBgContainer,
          }}
        >
          <Form
            onFinish={submitForm}
            layout="vertical"
            size="large"
            style={{ width: 400 }}
          >
            <h1 style={{ fontSize: 24 }}>欢迎登录</h1>
            <Form.Item
              label="用户名"
              name="userAccount"
              rules={[{ required: true, message: "请填写用户名!" }]}
              required={false}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="userPassword"
              rules={[{ required: true, message: "请填写密码!" }]}
              required={false}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              label="验证码"
              name="verifyCode"
              rules={[{ required: true, message: "请填写验证码!" }]}
              required={false}
            >
              <Input.Search
                placeholder="请输入验证码"
                enterButton={authCode[0]}
                onSearch={getAuthCode}
              />
            </Form.Item>

            <Form.Item style={{ marginTop: 40 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default Login;
