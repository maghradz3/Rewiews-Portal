import { Box } from "@mui/material";
import React, { useState } from "react";
import { Alert, Button, Input } from "../../atoms";
import { generateRegisterFormValues } from "./generateRegisterFormValues";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { authenticatedUser } from "../../redux/slice";
import { useForm, useAlert } from "../../hooks";
import FileBase64 from "react-file-base64";

export const RegisterForm = () => {
  const { formValues: registerFormValues, onFormChange } = useForm(
    generateRegisterFormValues()
  );
  const [image, setImage] = useState("");
  const { alertState, handleClose, showAlert } = useAlert();

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
      .catch((error) => {
        const { message } = error;
        const errorMessage = `${message} This email is already taken!`;
        showAlert("error", errorMessage);
      });
  };

  return (
    <Box className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 bg-gray-200 dark:bg-gray-800 rounded-lg max-w-md mx-auto mt-10 shadow-lg">
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
      <label className="mt-4 text-gray-300 cursor-pointer transition duration-500 ease-in-out inline-block text-center p-2 w-full rounded-md border border-black hover:bg-blue-500 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <span>Upload Image</span>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage(base64)}
        />
      </label>
      <Button onClick={onSubmit}>Register</Button>
      <Alert {...alertState} handleClose={handleClose} />
    </Box>
  );
};
