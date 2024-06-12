import { Input } from "antd";
import { DataOfLoginFieldsType } from "../types/loginAndRegister";

export const dataOfFields: DataOfLoginFieldsType = [
  {
    name: "email",
    Element: Input,
  },
  {
    name: "password",
    Element: Input.Password,
  },
];
