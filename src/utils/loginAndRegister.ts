import Cookie from "js-cookie";
import axios from "axios";
import { notification } from "antd";
import { handleLoginType, handleRegisterType } from "../types/loginAndRegister";
import { handleError } from "./errorHandler";

export const handleLogin: handleLoginType = (data) => {
  axios
    .post("/auth/login", data)
    .then((res) => {
      Cookie.set("token", res.data.access_token, { secure: true });
      notification.success({
        message: "welcome to panel",
      });
      setTimeout(() => window.location.replace("/dashboard"), 3000);
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
