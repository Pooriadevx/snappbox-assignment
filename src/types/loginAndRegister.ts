type LoginInputsType = {
  email: string;
  password: string;
};

export type DataOfLoginFieldsType = ["email", "password"];

export type handleLoginType = (data: LoginInputsType) => void;

export type DataOfRegisterFieldsType = [
  "firstName",
  "lastName",
  "email",
  "password",
  "phone"
];

type RegisterInputsType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

export type handleRegisterType = (data: RegisterInputsType) => void;
