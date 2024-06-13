import { KeyboardEvent } from "react";
import { openSnackbarType } from "./common";

export type handleVerifyCodeType = (
  verifyCode: string,
  openSnackbar: openSnackbarType
) => void;

export type handleResendCodeType = (openSnackbar: openSnackbarType) => void;

export type useCodeInputType = () => {
  otpBoxRef: HTMLInputElement[];
  handleChange: (target: EventTarget) => void;
  handleBackspaceEnter: (e: KeyboardEvent<HTMLElement>) => void;
};

export type formValuesType = { key: string; number: string };
