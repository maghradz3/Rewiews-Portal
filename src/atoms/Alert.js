import { Snackbar, Alert as MUIAlert } from "@mui/material";

export const Alert = ({ open, handleClose, severity, message }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "", horizontal: "center" }}
      open={open}
      variant="standart"
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <MUIAlert open={open} duration={3000} severity={severity}>
        {message}
      </MUIAlert>
    </Snackbar>
  );
};
