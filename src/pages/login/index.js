import { useState, useEffect } from "react";
import { Layout, Button, Form, Input, theme } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import LoginBanner from "@/components/LoginBanner";

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

  const navigate = useNavigate();
  const submitForm = (values) => {
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
      });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
        background: colorBgContainer,
      }}
    >
      <Layout.Header>
        <h1 style={{ fontSize: 24, color: "#fff" }}>公共服务管理平台</h1>
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light" width="60%" style={{ padding: 24 }}>
          <LoginBanner />
        </Layout.Sider>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
