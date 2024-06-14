import { notification } from "antd";
import axios from "axios";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;
    if (err?.data.message) {
      notification.warning({
        message: err.data.message,
      });
    }
  }
};
