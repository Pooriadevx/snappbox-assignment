import { Dispatch, FormEvent, SetStateAction } from "react";
import { openSnackbarType } from "./common";
import { InputRef, PasswordProps } from "antd/es/input";

export type DataOfLoginFieldsType = Array<{
  name: string;
  Element: React.ForwardRefExoticComponent<
    PasswordProps & React.RefAttributes<InputRef>
  >;
}>;

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
