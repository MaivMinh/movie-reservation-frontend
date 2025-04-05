import { Alert, Button, Form, Input, Divider, Typography } from "antd";
import React, { useState, useEffect } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import { motion } from "framer-motion"; // Add framer-motion for animations

const { Title, Text } = Typography;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register - Movie Reservation System";
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    console.log(values);
    const registration = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    // Replace this with your actual API call
    apiClient
      .post("/api/auth/register", registration)
      .then((res) => {
        setLoading(false);
        navigate("/login?registered=true");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          setError(
            error.response.data?.message ||
              "Có lỗi xảy ra. Vui lòng thử lại sau."
          );
        } else {
          setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(false);
    setError("Please check your input and try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 p-4 relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-purple-900/80"></div>
      </div>

      <div className="grid md:grid-cols-2 w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden z-10">
        {/* Left side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12"
        >
          <div className="mb-8 text-center">
            <Title level={2} className="text-gray-800 mb-2">
              Create Account
            </Title>
            <Text className="text-gray-500">
              Join our movie reservation platform
            </Text>
          </div>

          {error && (
            <Alert message={error} type="error" showIcon className="mb-6" />
          )}

          <Form
            name="register-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username!" },
                {
                  pattern: /^[0-9A-Za-z]{6,16}$/,
                  message:
                    "Username must be 6-16 characters long and contain only letters and numbers.",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<UserOutlined className="text-gray-400 mr-2" />}
                placeholder="Username"
                className="rounded-lg"
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className="text-gray-400 mr-2" />}
                placeholder="Email"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /(0[3|5|7|8|9])+([0-9]{8})\b/g, /// Bắt đầu bằng 03 || 05 || 07 || 08 || 09 và theo sau là 8 số
                  message: "Please enter a valid phone number!",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<PhoneOutlined className="text-gray-400 mr-2" />}
                placeholder="Phone number"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400 mr-2" />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<CheckCircleOutlined className="text-gray-400 mr-2" />}
                placeholder="Confirm password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<UserAddOutlined />}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>
            <span className="text-gray-400">Already have an account?</span>
          </Divider>

          <Button
            type="default"
            onClick={() => navigate("/login")}
            className="w-full h-12 border-indigo-600 text-indigo-600 hover:text-indigo-700 hover:border-indigo-700 rounded-lg"
          >
            Log In
          </Button>
        </motion.div>

        {/* Right side - Image/Graphics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block relative"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80')",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/70 to-purple-900/90"></div>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-white">
              <div className="text-center max-w-md">
                <h2 className="text-3xl font-bold mb-6">
                  Start Your Movie Journey
                </h2>
                <p className="text-white/80 mb-8">
                  Create an account to book tickets, save your favorite
                  theaters, and receive special offers and promotions.
                </p>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-white/60"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
