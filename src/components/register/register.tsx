import React from "react";
import { Button, Flex, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { useNotification } from "../../hooks/useNotification";
import { handleRegister } from "../../utils/loginAndRegister";
import { dataOfRegisterFields } from "../../constants/common";

const Register: React.FC = () => {
  const { contextHolder, openNotification } = useNotification();

  return (
    <>
      <Flex justify="center" align="center" vertical>
        <Title level={4}>Register</Title>
        <Form
          name="Form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          onFinish={(values) => handleRegister(values, openNotification)}
          autoComplete="off"
        >
          {dataOfRegisterFields.map((name) => {
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
              <Button type="link" href="/" size="large">
                Login
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
      {contextHolder}
    </>
  );
};

export default Register;
