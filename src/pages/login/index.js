import { useState } from "react";
import { App, Layout, Button, Form, Input, theme, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import LoginBanner from "@/components/LoginBanner";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme } from "@/store/modules/system";
import styled from "styled-components";
import useAxios from "@/hooks/axios";
import { useMount } from "ahooks";

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  background: ${(props) => props.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 9;
`;

const Login = function () {
  const axios = useAxios();
  const { message } = App.useApp();

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
  useMount(() => {
    getAuthCode();
  });
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
        message.success("登录成功！");
      })
      .catch(() => {
        getAuthCode(); // 更新验证码
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    token: { colorBgLayout, colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header background={colorBgContainer}>
        <h1 style={{ fontSize: 24 }}>公共服务管理平台</h1>
        <div className="tools">
          <Switch
            checked={themeName === "dark"}
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
          style={{ background: colorBgContainer }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 800,
                padding: 24,
              }}
            >
              <LoginBanner />
            </div>
          </div>
        </Layout.Sider>
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: colorBgLayout,
          }}
        >
          <Form
            onFinish={submitForm}
            layout="vertical"
            size="large"
            style={{ width: "100%", maxWidth: 448, padding: 24 }}
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
};

export default Login;
