import React from "react";
import { generateLoginFormValues } from "./generateLoginFormValues";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authenticatedUser } from "../../redux/slice";
import { Button, Input } from "../../atoms";
import { Box } from "@mui/material";
import { useForm } from "../../hooks";

export const LoginForm = () => {
  const { formValues: loginFormValues, onFormChange } = useForm(
    generateLoginFormValues()
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = () => {
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    dispatch(
      authenticatedUser({ formValues: { email, password }, isLogin: true })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box className="flex flex-col items-center justify-center gap-4 p-6 w-full max-w-md mx-auto mt-10 bg-white rounded-md shadow-md dark:bg-gray-800">
      <Input
        name="email"
        label="email"
        value={loginFormValues.email.value}
        error={loginFormValues.email.error}
        onChange={onFormChange}
      />
      <Input
        name="password"
        label="password"
        value={loginFormValues.password.value}
        error={loginFormValues.password.error}
        onChange={onFormChange}
      />
      <Button onClick={onSubmit}>Login</Button>
    </Box>
  );
};
