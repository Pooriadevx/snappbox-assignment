import axios from "axios";
import { notification } from "antd";
import { handleLoginType, handleRegisterType } from "../types/loginAndRegister";
import { handleError } from "./errorHandler";

export const handleLogin: handleLoginType = (data) => {
  axios
    .post("/auth/login", data)
    .then((res) => {
      axios.defaults.headers.common.Authorization = res.data.access_token;
      notification.success({ message: "welcome to panel" });
    })
    .catch((err) => {
      handleError(err);
    });
};

export const handleRegister: handleRegisterType = (data) => {
  axios
    .post("/auth/register", data)
    .then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data));
      notification.info({ message: `Your Code: ${res.data.verify_code}` });
      setTimeout(() => window.location.replace("/verify"), 4000);
    })
    .catch((err) => {
      handleError(err);
    });
};
