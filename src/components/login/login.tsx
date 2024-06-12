import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { LoginInputsType } from "../../types/loginAndRegister";
import { handleFields, handleLogin } from "../../utils/loginAndRegister";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";

const Login: React.FC = () => {
  const [data, setData] = useState<LoginInputsType>({
    email: "",
    password: "",
  });
  const { CustomSnackbar, openSnackbar } = useCustomSnackbar();

  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        xs={3}
        gap={1}
        paddingY={10}
        onChange={(e) => handleFields(e, setData)}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {Object.keys(data).map((item) => (
          <TextField
            key={item}
            name={item}
            fullWidth
            label={item}
            value={data[item as keyof LoginInputsType]}
          />
        ))}
        <Button
          onClick={() => handleLogin(data, openSnackbar)}
          variant="contained"
          fullWidth
        >
          Submit
        </Button>
        <Button href="/register" variant="text">
          Register
        </Button>
      </Grid>
      {CustomSnackbar}
    </>
  );
};

export default Login;
