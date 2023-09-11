export const generateLoginFormValues = () => {
  return {
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
