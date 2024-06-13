import React, { KeyboardEvent } from "react";
import { CODE_INPUT_DIGITS } from "./../constants/common";
import { useCodeInputType } from "../types/codeInput";

export const useCodeInput: useCodeInputType = () => {
  const otpBoxRef: HTMLInputElement[] = [];

  const handleChange = (target: EventTarget) => {
    const { value, dataset } = target as HTMLInputElement;
    const index = Number(dataset.index);
    if (value && index < CODE_INPUT_DIGITS - 1) {
      otpBoxRef[index + 1].focus();
    }
  };

  const handleBackspaceEnter = (e: KeyboardEvent<HTMLElement>) => {
    const { dataset } = e.target as HTMLInputElement;
    const index = Number(dataset.index);

    if (e.key === "Backspace" && index > 0) {
      otpBoxRef[index - 1].focus();
    } else if (e.key === "Enter" && index < CODE_INPUT_DIGITS - 1) {
      otpBoxRef[index + 1].focus();
    }
  };

  return {
    otpBoxRef,
    handleChange,
    handleBackspaceEnter,
  };
};
