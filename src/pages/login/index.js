import { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";

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

  return (
    <Form
      onFinish={submitForm}
      layout="vertical"
      size="large"
      style={{ width: 600, margin: "200px auto" }}
    >
      <Form.Item
        label="用户名"
        name="userAccount"
        rules={[{ required: true, message: "请填写用户名!" }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="userPassword"
        rules={[{ required: true, message: "请填写密码!" }]}
      >
        <Input placeholder="请输入密码" />
      </Form.Item>

      <Form.Item
        label="验证码"
        name="verifyCode"
        rules={[{ required: true, message: "请填写验证码!" }]}
      >
        <Input placeholder="请输入验证码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登 录
        </Button>
        <Button style={{ width: 70 }} onClick={getAuthCode}>
          {authCode[0]}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
