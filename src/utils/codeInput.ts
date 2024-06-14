import { notification } from "antd";
import axios from "axios";
import {
  handleResendCodeType,
  handleVerifyCodeType,
} from "./../types/codeInput";
import { handleError } from "./errorHandler";

export const handleVerifyCode: handleVerifyCodeType = (verifyCode) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const data = {
      email: JSON.parse(profile).email,
      verify_code: verifyCode,
    };
    axios
      .post("/auth/verify", data)
      .then((res) => {
        if (res.data) {
          notification.success({ message: "Register Completed. Please Login" });
          setTimeout(() => window.location.replace("/"), 4000);
        } else {
          notification.warning({ message: "Wrong code" });
        }
      })
      .catch((err) => handleError(err));
  } else {
    notification.error({ message: "Profile doesn't exist!" });
    setTimeout(() => window.location.replace("/register"), 2000);
  }
};

export const handleResendCode: handleResendCodeType = () => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    axios
      .post("/auth/resend-code", { email: JSON.parse(profile).email })
      .then((res) => {
        notification.info({ message: `Code: ${res.data}` });
      })
      .catch((err) => {
        handleError(err);
      });
  } else {
    notification.error({
      message: "Profile doesn't exist!",
    });
    setTimeout(() => window.location.replace("/register"), 2000);
  }
};
