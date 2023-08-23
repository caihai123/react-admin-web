import { useState } from "react";
import {
  App,
  Layout,
  Button,
  Form,
  Input,
  theme,
  Switch,
  Checkbox,
} from "antd";
import { useNavigate } from "react-router-dom";
import LoginBanner from "./components/LoginBanner";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme } from "@/store/system";
import styled from "styled-components";
import axios from "@/utils/axios";
import {
  UserOutlined,
  LockOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboOutlined,
} from "@ant-design/icons";
import LogoSvg from "@/assets/logo.svg";
import FormBg from "@/assets/login-bg.svg";

const Header = styled(Layout.Header)`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  background: ${(props) => props.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 9;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  & > .logo {
    height: 44px;
  }
  & > h1 {
    margin: 0;
    margin-left: 12px;
  }
`;

const BlogrollIcon = styled.span`
  margin-left: 8px;
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s ease 0s;
  &:hover {
    color: rgb(24, 144, 255);
  }
`;

const Login = function () {
  const { message } = App.useApp();

  // 换肤相关 start
  const dispatch = useDispatch();
  const themeName = useSelector(selectTheme);
  // 换肤相关 end

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const submitForm = (values) => {
    setLoading(true);

    axios
      .post("/api/login", values)
      .then((value) => {
        const { token } = value.result;
        localStorage.setItem("token", token);
        navigate("/");
        message.success("登录成功！");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const {
    token: { colorBgLayout, colorBgContainer, colorTextTertiary },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header background={colorBgContainer}>
        <Title>
          <img src={LogoSvg} alt="logo" className="logo" />
          <h1 style={{ fontSize: 24 }}>{process.env.REACT_APP_WEBSITE_NAME}</h1>
        </Title>
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
            backgroundColor: colorBgLayout,
            backgroundImage: `url(${FormBg})`,
          }}
        >
          <Form
            onFinish={submitForm}
            layout="vertical"
            size="large"
            style={{
              width: "100%",
              marginTop: -40,
              maxWidth: 448,
              padding: 24,
            }}
            initialValues={{
              userAccount: "admin",
              userPassword: "password",
            }}
            autoComplete="off"
          >
            <h1 style={{ marginBottom: 24, fontSize: 24 }}>欢迎登录</h1>
            <Form.Item
              name="userAccount"
              rules={[{ required: true, message: "请填写用户名!" }]}
              required={false}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名：admin" />
            </Form.Item>
            <Form.Item
              name="userPassword"
              rules={[{ required: true, message: "请填写密码!" }]}
              required={false}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码：password"
              />
            </Form.Item>

            <div style={{ marginBottom: 24 }}>
              <Checkbox defaultChecked>自动登录</Checkbox>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a style={{ float: "right" }}>忘记密码？</a>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading}
              >
                登 录
              </Button>
            </Form.Item>

            <div style={{ color: colorTextTertiary }}>
              其他登录方式：
              <BlogrollIcon>
                <AlipayCircleOutlined />
              </BlogrollIcon>
              <BlogrollIcon>
                <TaobaoCircleOutlined />
              </BlogrollIcon>
              <BlogrollIcon>
                <WeiboOutlined />
              </BlogrollIcon>
            </div>
          </Form>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Login;
