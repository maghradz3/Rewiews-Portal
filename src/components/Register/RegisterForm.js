import { Box } from "@mui/material";
import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import { generateRegisterFormValues } from "./generateRegisterFormValues";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authenticatedUser } from "../../redux/slice";
import { useForm } from "../../hooks";
import FileBase64 from "react-file-base64";

export const RegisterForm = () => {
  const { formValues: registerFormValues, onFormChange } = useForm(
    generateRegisterFormValues()
  );
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const firstName = registerFormValues.firstName.value;
    const lastName = registerFormValues.lastName.value;
    const email = registerFormValues.email.value;
    const password = registerFormValues.password.value;
    console.log(firstName, lastName, email, password, image);
    dispatch(
      authenticatedUser({
        formValues: { firstName, lastName, email, password, image },
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
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setImage(base64);
        }}
      />
      <Button onClick={onSubmit}>Register</Button>
    </Box>
  );
};
