import { AlertProps, SnackbarProps } from "@mui/material";

export type openSnackbarType = (message: string) => void;

export type useCustomSnackbarType = (
  data?: Partial<{
    alert: AlertProps;
    snackbar: SnackbarProps;
  }>
) => {
  CustomSnackbar: JSX.Element;
  openSnackbar: (message: string) => void;
};
