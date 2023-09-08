import React from "react";
import { Route, Routes } from "react-router";
import { HomePage, RegisterPage, LoginPage } from "./pages";

export const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
