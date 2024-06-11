import {
  handleResendCodeType,
  handleVerifyCodeType,
} from "./../types/codeInput";
import axios from "axios";

export const handleVerifyCode: handleVerifyCodeType = (
  verifyCode,
  openSnackbar
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
          openSnackbar("Please Login");
          window.location.replace("/");
        } else {
          openSnackbar("wrong code");
        }
      })
      .catch((err) => openSnackbar(err.message));
  }
};

export const handleResendCode: handleResendCodeType = (openSnackbar) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    axios
      .post("/auth/resend-code", { email: JSON.parse(profile).email })
      .then((res) => {
        openSnackbar(`code: ${res.data}`);
      })
      .catch((err) => {
        openSnackbar(err.response.data.message);
      });
  }
};
