import { Button, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {

  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md -translate-y-[50%]">
        <h2 className="mb-6 text-2xl font-bold text-center text-black">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-500">
            Register now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
