import React from "react";
import { Button, Flex, Form, Typography } from "antd";
import { LoginInputsType } from "../../types/loginAndRegister";
import { handleLogin } from "../../utils/loginAndRegister";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { dataOfFields } from "../../constants/loginAndRegister";
import Title from "antd/es/typography/Title";

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
          {dataOfFields.map(({ name, Element }) => {
            return (
              <Form.Item<LoginInputsType>
                label={name}
                key={name}
                name={name as keyof LoginInputsType}
                rules={[
                  {
                    required: true,
                    message: `Please input your ${name}!`,
                  },
                ]}
              >
                <Element size="large" />
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
