import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useCustomSnackbarType } from "../types/common";

export const useCustomSnackbar: useCustomSnackbarType = ({
  alert,
  snackbar,
} = {}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openSnackbar = (message: string) => {
    setOpen(true);
    setMessage(message);
  };

  const CustomSnackbar: JSX.Element = (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={4000}
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      {...snackbar}
    >
      <Alert severity="info" variant="filled" sx={{ width: "100%" }} {...alert}>
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    CustomSnackbar,
    openSnackbar,
  };
};
