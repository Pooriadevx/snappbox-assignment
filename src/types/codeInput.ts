import { KeyboardEvent, MutableRefObject } from "react";
import { openSnackbarType } from "./common";

export type handleVerifyCodeType = (
  verifyCode: string,
  openSnackbar: openSnackbarType
) => void;

export type handleResendCodeType = (
  openSnackbar: openSnackbarType
) => void;

export type useCodeInputType = (openSnackbar: openSnackbarType) => {
  otp: string[];
  otpBoxRef: MutableRefObject<HTMLInputElement[]>;
  handleChange: (target: EventTarget) => void;
  handleBackspaceEnter: (e: KeyboardEvent<HTMLDivElement>) => void;
};
