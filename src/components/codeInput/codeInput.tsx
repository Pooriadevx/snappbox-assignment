import React from "react";
import { Button, Flex, Form, InputNumber } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import Title from "antd/es/typography/Title";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { handleResendCode, handleVerifyCode } from "../../utils/codeInput";
import { useCodeInput } from "../../utils/useCodeInput";
import { formValuesType } from "../../types/codeInput";
import { CODE_INPUT_DIGITS } from "../../constants/common";
import classes from "./codeInput.module.scss";

export const CodeInput: React.FC = () => {
  const { CustomSnackbar, openSnackbar } = useCustomSnackbar();
  const { handleBackspaceEnter, otpBoxRef, handleChange } = useCodeInput();

  const [form] = Form.useForm<formValuesType>();
  const values = Form.useWatch((values) => Object.values(values), form) || [];

  const onFinish = (values: formValuesType) => {
    const otpCode = Object.values(values).join("");
    handleVerifyCode(otpCode, openSnackbar);
  };

  return (
    <>
      <Flex align={"center"} justify={"center"} gap={14} vertical>
        <Title level={5}>Type Verify Code:</Title>
        <Form
          id="Form"
          form={form}
          onFinish={onFinish}
          style={{ width: "100%" }}
          onChange={(e) => handleChange(e.target)}
          onKeyUp={(e) => handleBackspaceEnter(e)}
        >
          <Flex gap={"middle"} justify="center" align="center">
            {Array.from({ length: CODE_INPUT_DIGITS }, (_, index) => {
              return (
                <Form.Item key={index} name={index}>
                  <InputNumber
                    controls={false}
                    variant="outlined"
                    className={classes.input}
                    maxLength={1}
                    data-index={index}
                    ref={(ref) => (otpBoxRef[index] = ref as HTMLInputElement)}
                  />
                </Form.Item>
              );
            })}
          </Flex>
        </Form>
        <ButtonGroup>
          <Button
            type="primary"
            disabled={values.join("").length !== CODE_INPUT_DIGITS}
            htmlType="submit"
            form="Form"
          >
            verify
          </Button>
          <Button
            onClick={() => handleResendCode(openSnackbar)}
            color="warning"
          >
            Resend Code
          </Button>
        </ButtonGroup>
      </Flex>
      {CustomSnackbar}
    </>
  );
};

export default CodeInput;
