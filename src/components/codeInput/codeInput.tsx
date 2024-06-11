import React from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { handleResendCode, handleVerifyCode } from "../../utils/codeInput";
import { useCodeInput } from "../../utils/useCodeInput";
import classes from "./codeInput.module.scss";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";

const numberOfDigits = 4;

export const CodeInput: React.FC = () => {
  const { CustomSnackbar, openSnackbar } = useCustomSnackbar();
  const { handleBackspaceEnter, handleChange, otpBoxRef, otp } =
    useCodeInput(openSnackbar);

  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        paddingY={20}
        gap={4}
        direction={"column"}
      >
        <Typography variant="h5">Type Verify Code:</Typography>
        <Grid
          gap={1}
          xs={4}
          alignItems={"center"}
          justifyContent={"center"}
          container
          onChange={(e) => handleChange(e.target)}
          onKeyUp={(e) => handleBackspaceEnter(e)}
        >
          {otp.map((digit, index) => (
            <Grid item key={index} xs={1}>
              <TextField
                variant="outlined"
                inputProps={{
                  className: classes.input,
                  maxLength: 1,
                  "data-index": index,
                }}
                size="small"
                value={digit}
                inputRef={(ref) => (otpBoxRef.current[index] = ref)}
              />
            </Grid>
          ))}
        </Grid>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            variant="contained"
            disabled={otp.join("").length !== numberOfDigits}
            onClick={() => handleVerifyCode(otp.join(""), openSnackbar)}
          >
            verify
          </Button>
          <Button
            variant="contained"
            onClick={() => handleResendCode(openSnackbar)}
            color="warning"
          >
            Resend Code
          </Button>
        </ButtonGroup>
      </Grid>
      {CustomSnackbar}
    </>
  );
};

export default CodeInput;
