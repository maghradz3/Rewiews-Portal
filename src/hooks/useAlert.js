import { useState } from "react";

export const useAlert = () => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setAlertState((prev) => ({
      ...prev,
      open: false,
      message: "",
    }));
  };

  const showAlert = (severity, message) => {
    setAlertState({
      open: true,
      severity,
      message,
    });
  };

  return {
    alertState,
    handleClose,
    showAlert,
  };
};
