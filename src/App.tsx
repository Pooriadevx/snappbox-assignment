import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex } from "antd";
import CodeInput from "./components/codeInput/codeInput";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TableData from "./components/table/table";

export default function App() {
  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Routes>
        <Route path="/dashboard" element={<TableData />} />
        <Route path="/verify" element={<CodeInput />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Flex>
  );
}
