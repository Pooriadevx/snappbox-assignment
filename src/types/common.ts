import { IconType } from "antd/es/notification/interface";
import { ReactElement } from "react";

export type openNotificationType = (message: string, type: IconType) => void;

export type useNotificationType = () => {
  contextHolder: ReactElement;
  openNotification: openNotificationType;
};
