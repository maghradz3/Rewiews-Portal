import { Box, CircularProgress } from "@mui/material";

export const Loading = ({ size = 100, color = "secondary" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "180px",
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
};

export const LoadingWrapper = ({ isLoading, children }) => {
  if (isLoading) {
    return <Loading />;
  }

  return children;
};
