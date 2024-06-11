import { Dispatch, FormEvent, SetStateAction } from "react";
import { openSnackbarType } from "./common";

export type LoginInputsType = {
  email: string;
  password: string;
};

export type handleLoginType = (
  data: LoginInputsType,
  openSnackbar: openSnackbarType
) => void;

export type RegisterInputsType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type handleRegisterType = (
  data: RegisterInputsType,
  openSnackbar: openSnackbarType
) => void;

export type handleFieldsType = <T>(
  event: FormEvent<HTMLDivElement>,
  cb: Dispatch<SetStateAction<T>>
) => void;
