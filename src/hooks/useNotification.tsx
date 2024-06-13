import { openNotificationType, useNotificationType } from "../types/common";
import { notification } from "antd";

export const useNotification: useNotificationType = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification: openNotificationType = (message, type) => {
    api.open({
      message,
      placement: "topRight",
      closable: true,
      type: type,
      showProgress: true,
    });
  };

  return {
    contextHolder,
    openNotification,
  };
};
