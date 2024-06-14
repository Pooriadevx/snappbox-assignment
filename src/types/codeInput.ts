import { KeyboardEvent } from "react";

export type handleVerifyCodeType = (verifyCode: string) => void;

export type handleResendCodeType = () => void;

export type useCodeInputType = () => {
  otpBoxRef: HTMLInputElement[];
  handleChange: (target: EventTarget) => void;
  handleBackspaceEnter: (e: KeyboardEvent<HTMLElement>) => void;
};

export type formValuesType = { key: string; number: string };
