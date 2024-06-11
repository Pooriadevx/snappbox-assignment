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
      axios.defaults.headers.common.Authorization = res.data.access_token;
      openSnackbar("welcome to panel");
    })
    .catch((err) => {
      openSnackbar(err.message);
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
      openSnackbar(err.message);
    });
};
