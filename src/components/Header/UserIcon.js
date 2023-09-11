import {
  Avatar,
  Icon,
  IconButton,
  Menu,
  styled,
  Box,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks";
import { Button } from "../../atoms";
import { logoutUser } from "../../redux/slice";
const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",

  borderRadius: 10,
}));

export const UserIcon = () => {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useUser();
  console.log(userInfo);

  return (
    <Box>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <Avatar>PH</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <StyledBox>
          {!userInfo ? (
            <>
              <MenuItem>
                <Button onClick={() => navigate("/login")}>Log In</Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={() => navigate("/register")}>Sign Up</Button>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <Button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/register");
                }}
              >
                Log Out
              </Button>
            </MenuItem>
          )}
        </StyledBox>
      </Menu>
    </Box>
  );
};
