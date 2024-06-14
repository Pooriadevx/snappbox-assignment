import { notification } from "antd";
import { ValidateStatus } from "antd/es/form/FormItem";
import axios from "axios";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const err = error.response;
    if (err?.data.message) {
      notification.warning({
        message: err.data.message,
      });
    }
  } else {
    const textError: ValidateStatus = error.errorFields
      .map((item: any) => item.errors[0])
      .join(",");
    notification.warning({ message: textError });
  }
};
