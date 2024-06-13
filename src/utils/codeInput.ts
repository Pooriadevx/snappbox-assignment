import {
  handleResendCodeType,
  handleVerifyCodeType,
} from "./../types/codeInput";
import axios from "axios";

export const handleVerifyCode: handleVerifyCodeType = (
  verifyCode,
  openNotification
) => {
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
          openNotification("Register Completed. Please Login", "success");
          setTimeout(() => window.location.replace("/"), 4000);
        } else {
          openNotification("Wrong code", "warning");
        }
      })
      .catch((err) => openNotification(err.response.data.message, "warning"));
  } else {
    openNotification("Profile doesn't exist!", "error");
  }
};

export const handleResendCode: handleResendCodeType = (openNotification) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    axios
      .post("/auth/resend-code", { email: JSON.parse(profile).email })
      .then((res) => {
        openNotification(`Code: ${res.data}`, "info");
      })
      .catch((err) => {
        openNotification(err.response.data.message, "warning");
      });
  } else {
    openNotification("Profile doesn't exist!", "error");
  }
};
