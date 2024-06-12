import { Routes, Route } from "react-router-dom";
import CodeInput from "./components/codeInput/codeInput";
import Grid from "@mui/material/Grid";
import Login from "./components/login/login";
import Register from "./components/register/register";

export default function App() {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Routes>
        <Route path="/verify" element={<CodeInput />} />
        <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      </Routes>
    </Grid>
  );
}
