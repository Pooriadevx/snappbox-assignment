import { KeyboardEvent } from "react";
import { openNotificationType } from "./common";

export type handleVerifyCodeType = (
  verifyCode: string,
  openNotification: openNotificationType
) => void;

export type handleResendCodeType = (openNotification: openNotificationType) => void;

export type useCodeInputType = () => {
  otpBoxRef: HTMLInputElement[];
  handleChange: (target: EventTarget) => void;
  handleBackspaceEnter: (e: KeyboardEvent<HTMLElement>) => void;
};

export type formValuesType = { key: string; number: string };
