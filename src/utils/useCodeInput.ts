import React, { KeyboardEvent, useRef, useState } from "react";
import { handleVerifyCode } from "./codeInput";
import { useCodeInputType } from "../types/codeInput";

const numberOfDigits = 4;

export const useCodeInput: useCodeInputType = (openSnackbar) => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
  const otpBoxRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (target: EventTarget) => {
    const { value, dataset } = target as HTMLInputElement;
    const index = Number(dataset.index);

    if (/^[0-9]+$/.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspaceEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    const { value, dataset } = e.target as HTMLInputElement;
    const index = Number(dataset.index);

    if (e.key === "Backspace") {
      if (value) {
        let newArr = [...otp];
        newArr[index] = "";
        setOtp(newArr);
      } else if (index > 0) {
        otpBoxRef.current[index - 1].focus();
      }
    } else if (e.key === "Enter" && value) {
      if (index < numberOfDigits - 1) {
        otpBoxRef.current[index + 1].focus();
      } else {
        handleVerifyCode(otp.join(""), openSnackbar);
      }
    }
  };

  return {
    otp,
    otpBoxRef,
    handleChange,
    handleBackspaceEnter,
  };
};
