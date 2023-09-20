export const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("@")
          ? null
          : " email is not valid. Email have to include @ symbol ",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 3
          ? null
          : " password should have at least 3 character",
    },
  };
};
