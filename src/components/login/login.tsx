import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
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
        onChange={(e) => handleFields(e, setData)}
      >
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
      </Grid>
      {CustomSnackbar}
    </>
  );
};

export default Login;
