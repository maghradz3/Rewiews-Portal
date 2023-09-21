import { styled, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks";
import { Button } from "../../atoms";
import { logoutUser } from "../../redux/slice";
import { getUserInitials } from "../../helpers";
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
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {userInfo?.profilePicture ? (
            <img className="w-full h-full" src={userInfo?.profilePicture} />
          ) : (
            <h1 className="text-2xl"> {getUserInitials(userInfo)}</h1>
          )}
        </div>
      </label>

      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        {!userInfo ? (
          <>
            <li>
              <Button onClick={() => navigate("/register")}>
                Sign Up
                <span className="badge">New</span>
              </Button>
            </li>
            <li>
              <Button onClick={() => navigate("/login")}>Log In</Button>
            </li>
            <li>
              <Button onClick={() => navigate("/")}> Menu</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/login");
                }}
              >
                {" "}
                Log out
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
    // <Box>
    //   <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
    //     <Avatar>
    //       {userInfo?.profilePicture ? (
    //         <img className="w-full h-full" src={userInfo?.profilePicture} />
    //       ) : (
    //         getUserInitials(userInfo)
    //       )}
    //     </Avatar>
    //   </IconButton>
    //   <Menu
    //     anchorEl={anchor}
    //     open={Boolean(anchor)}
    //     onClose={() => setAnchor(null)}
    //   >
    //     <StyledBox>
    //       {!userInfo ? (
    //         <>
    //           <MenuItem>
    //             <Button onClick={() => navigate("/login")}>Log In</Button>
    //           </MenuItem>
    //           <MenuItem>
    //             <Button onClick={() => navigate("/register")}>Sign Up</Button>
    //           </MenuItem>
    //           <MenuItem>
    //             <Button onClick={() => navigate("/")}> Menu</Button>
    //           </MenuItem>
    //         </>
    //       ) : (
    //         <>
    //           <MenuItem>
    //             <Button onClick={() => navigate("/")}> Menu</Button>
    //           </MenuItem>
    //           <MenuItem>
    //             <Button
    //               onClick={() => {
    //                 dispatch(logoutUser());
    //                 navigate("/register");
    //               }}
    //             >
    //               Log Out
    //             </Button>
    //           </MenuItem>
    //         </>
    //       )}
    //     </StyledBox>
    //   </Menu>
    // </Box>
  );
};
