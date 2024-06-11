import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
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
        direction={"column"}
        onChange={(e) => handleFields(e, setData)}
      >
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
      </Grid>
      {CustomSnackbar}
    </>
  );
};

export default Register;
