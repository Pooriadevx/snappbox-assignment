import { Routes, Route } from "react-router-dom";
import CodeInput from "./components/codeInput/codeInput";
import Grid from "@mui/material/Grid";
import Home from "./pages/home";

export default function App() {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Routes>
        <Route path="/verify" element={<CodeInput />} />
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Grid>
  );
}
