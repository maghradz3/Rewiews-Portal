import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import { UserIcon } from "./UserIcon";

export const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <UserIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
