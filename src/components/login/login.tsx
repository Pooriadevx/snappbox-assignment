import React from "react";
import { Button, Flex, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { handleLogin } from "../../utils/loginAndRegister";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { dataOfFields } from "../../constants/loginAndRegister";

const Login: React.FC = () => {
  const { CustomSnackbar, openSnackbar } = useCustomSnackbar();

  return (
    <>
      <Flex
        justify="center"
        align="center"
        vertical
        style={{ width: "100%", height: "100vh" }}
      >
        <Title level={4}>Login</Title>
        <Form
          name="Form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          onFinish={(values) => handleLogin(values, openSnackbar)}
          autoComplete="off"
        >
          {dataOfFields.map((name) => {
            return (
              <Form.Item
                label={name}
                key={name}
                name={name}
                rules={[
                  {
                    required: true,
                    message: `Please input your ${name}!`,
                  },
                ]}
              >
                {name === "password" ? (
                  <Input.Password size="large" />
                ) : (
                  <Input size="large" />
                )}
              </Form.Item>
            );
          })}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Flex align="center" gap={"large"}>
              <Button type="primary" htmlType="submit" size="large">
                Submit
              </Button>
              <Button type="link" href="/register" size="large">
                Register
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
      {CustomSnackbar}
    </>
  );
};

export default Login;
