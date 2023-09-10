export const generateRegisterFormValues = () => {
  return {
    firstName: {
      value: "",
      required: true,
      error: "",
      validateInput: (firstName) =>
        firstName.length > 3 ? null : "name should have at least 3 character",
    },
    lastName: {
      value: "",
      required: true,
      error: "",
      validateInput: (lastName) =>
        lastName.length > 3
          ? null
          : " last name should have at least 3 character",
    },
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@gmail.com")
          ? null
          : " email is not valid. Please finish with @gmail.com",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : " password should have at least 6 character",
    },
  };
};
