import { ThemeConfig } from "antd";
import { DataOfRegisterFieldsType } from "../types/loginAndRegister";
import { DataOfLoginFieldsType } from "../types/loginAndRegister";

export const dataOfFields: DataOfLoginFieldsType = ["email", "password"];

export const dataOfRegisterFields: DataOfRegisterFieldsType = [
  "firstName",
  "lastName",
  "email",
  "password",
  "phone",
];

export const CODE_INPUT_DIGITS = 4;

export const CustomThemeConfig: ThemeConfig = {
  token: {
    fontFamily: "BNazanin",
  },
};
