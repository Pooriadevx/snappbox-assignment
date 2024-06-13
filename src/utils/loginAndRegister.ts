import axios from "axios";
import { handleLoginType, handleRegisterType } from "../types/loginAndRegister";

export const handleLogin: handleLoginType = (data, openNotification) => {
  axios
    .post("/auth/login", data)
    .then((res) => {
      axios.defaults.headers.common.Authorization = res.data.access_token;
      openNotification("welcome to panel", "success");
    })
    .catch((err) => {
      openNotification(err.response.data.message, "error");
    });
};

export const handleRegister: handleRegisterType = (data, openNotification) => {
  axios
    .post("/auth/register", data)
    .then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data));
      openNotification(`Your Code: ${res.data.verify_code}`, "info");
      setTimeout(() => window.location.replace("/verify"), 4000);
    })
    .catch((err) => {
      openNotification(err.response.data.message, "error");
    });
};
