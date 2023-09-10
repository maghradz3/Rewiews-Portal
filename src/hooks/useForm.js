import React from "react";

export const useForm = (defaultFormValues) => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const onFormChange = (e) => {
    const { name, value } = e.target;
    const { validateInput } = formValues[name];
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [name]: {
          ...prevFormValues[name],
          value,
          error: validateInput ? validateInput(value) : null,
        },
      };
    });
  };

  return {
    formValues,
    onFormChange,
    clearForm,
    setFormValues,
  };
};
