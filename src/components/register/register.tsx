import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { RegisterInputsType } from "../../types/loginAndRegister";
import { handleFields, handleRegister } from "../../utils/loginAndRegister";

const Register: React.FC = () => {
  const [data, setData] = useState<RegisterInputsType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });
  const { CustomSnackbar, openSnackbar } = useCustomSnackbar();

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        xs={3}
        paddingY={10}
        direction={"column"}
        onChange={(e) => handleFields(e, setData)}
      >
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {Object.keys(data).map((item) => (
          <TextField
            key={item}
            name={item}
            label={item}
            fullWidth
            value={data[item as keyof RegisterInputsType]}
          />
        ))}
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleRegister(data, openSnackbar)}
        >
          Submit
        </Button>
        <Button href="/login" variant="text">
          Login
        </Button>
      </Grid>

      {CustomSnackbar}
    </>
  );
};

export default Register;
