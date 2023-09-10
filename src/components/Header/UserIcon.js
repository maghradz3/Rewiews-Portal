import { Avatar, Icon, IconButton, Menu, styled, Box } from "@mui/material";
import React, { useState } from "react";
const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",

  borderRadius: 10,
}));

export const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  return (
    <Box>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar>PH</Avatar>
      </IconButton>
      {/* <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={setAnchor(null)}>
        <StyledBox></StyledBox>
      </Menu> */}
    </Box>
  );
};
