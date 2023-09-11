import { Box } from "@mui/material";
import React from "react";
import { Button, Input } from "../../atoms";
import { generateRegisterFormValues } from "./generateRegisterFormValues";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authenticatedUser } from "../../redux/slice";
import { useForm } from "../../hooks";

export const RegisterForm = () => {
  const { formValues: registerFormValues, onFormChange } = useForm(
    generateRegisterFormValues()
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const firstName = registerFormValues.firstName.value;
    const lastName = registerFormValues.lastName.value;
    const email = registerFormValues.email.value;
    const password = registerFormValues.password.value;
    console.log(firstName, lastName, email, password);
    dispatch(
      authenticatedUser({
        formValues: { firstName, lastName, email, password },
        isLogin: false,
      })
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Input
        name="firstName"
        label="firstName"
        value={registerFormValues.firstName.value}
        error={registerFormValues.firstName.error}
        onChange={onFormChange}
      />
      <Input
        name="lastName"
        label="lastName"
        value={registerFormValues.lastName.value}
        error={registerFormValues.lastName.error}
        onChange={onFormChange}
      />
      <Input
        name="email"
        label="email"
        value={registerFormValues.email.value}
        error={registerFormValues.email.error}
        onChange={onFormChange}
      />
      <Input
        name="password"
        label="password"
        value={registerFormValues.password.value}
        error={registerFormValues.password.error}
        onChange={onFormChange}
      />
      <Button onClick={onSubmit}>Register</Button>
    </Box>
  );
};
