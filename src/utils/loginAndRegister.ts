import Cookie from "js-cookie";
import axios from "axios";
import {
  handleFieldsType,
  handleLoginType,
  handleRegisterType,
} from "../types/loginAndRegister";

export const handleFields: handleFieldsType = (event, cb) => {
  const element = event.target as HTMLInputElement;
  cb((prev) => ({
    ...prev,
    [element.name]: element.value,
  }));
};

export const handleLogin: handleLoginType = (data, openSnackbar) => {
  axios
    .post("/auth/login", data)
    .then((res) => {
      Cookie.set("token", res.data.access_token, { secure: true });
      openSnackbar("welcome to panel");
      setTimeout(() => window.location.replace("/dashboard"), 3000);
    })
    .catch((err) => {
      openSnackbar(err.response.data.message);
    });
};

export const handleRegister: handleRegisterType = (data, openSnackbar) => {
  axios
    .post("/auth/register", data)
    .then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data));
      openSnackbar(`Your Code: ${res.data.verify_code}`);
      setTimeout(() => window.location.replace("/verify"), 4000);
    })
    .catch((err) => {
      openSnackbar(err.response.data.message);
    });
};
