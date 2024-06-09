import React, { KeyboardEvent, useRef, useState } from "react";
import { Grid, TextField } from "@mui/material";

const numberOfDigits = 4;

export const CodeInput = () => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
  const otpBoxRef = useRef<HTMLInputElement[]>([]);

  function handleChange(value: string, index: number) {
    if (/^[0-9]+$/.test(value)) {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);

      if (value && index < numberOfDigits - 1) {
        otpBoxRef.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceEnter(
    e: KeyboardEvent<HTMLDivElement>,
    index: number
  ) {
    if (e.key === "Backspace" && index > 0) {
      if ((e.target as HTMLInputElement).value) {
        let newArr = [...otp];
        newArr[index] = "";
        setOtp(newArr);
      } else {
        otpBoxRef.current[index - 1].focus();
      }
    } else if (e.key === "Enter" && (e.target as HTMLInputElement).value) {
      if (index < numberOfDigits - 1) {
        otpBoxRef.current[index + 1].focus();
      } else {
        // send code...
      }
    }
  }

  return (
    <Grid container alignItems={"center"} justifyContent={"center"} gap={3}>
      {otp.map((digit, index) => (
        <Grid item key={index} container xs={1}>
          <TextField
            variant="outlined"
            inputProps={{
              maxLength: 1,
            }}
            size="small"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceEnter(e, index)}
            inputRef={(ref) => (otpBoxRef.current[index] = ref)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CodeInput;
