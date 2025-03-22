import { Alert, Button, Form, Input, Space } from "antd";
import React, { useContext, useState } from "react";
import authClient from "../services/auth.js";
import Title from "antd/es/skeleton/Title.js";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AppContext);

  const onFinish = (values) => {
    /* Hàm này kích hoạt thực hiện login. */
    setLoading(true);
    const { username, password } = values;

    authClient
      .post("/login", { username, password })
      .then((res) => {
        const payload = res.data;
        setLoading(false);
        if (payload.status === 200) {
          const data = payload.data;
          login(data);
          navigate("/");
        } else {
          setError(payload.message);
        }
        clearTimeout(id);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        clearTimeout(id);
      });

    const id = setTimeout(() => {
      setLoading(false);
      setError("Login failed!");
    }, 10000);
  };

  const onFinishFailed = (errorInfo) => {
    /* Hàm này kích hoạt login thất bại. */
    setLoading(false);
  };

  return (
    <div className="flex items-start justify-center w-full h-screen bg-gray-100">
      <div className="w-[400px] -translate-y-20 p-6 bg-[#FFF] rounded-[8px] shadow-[0px 4px 12px rgba(0, 0, 0, 0.15)] translate-y-[25%]">
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
          Login
        </Title>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="link" htmlType="button">
                Forgot password?
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
