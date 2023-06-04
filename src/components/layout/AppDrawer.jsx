import React from "react";
import { Drawer, Toolbar, Box, List, ListItem, Divider, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import SavingsIcon from "@mui/icons-material/Savings";
import { useLocation, useNavigate } from "react-router-dom";

const drawerItems = [
  {
    id: "Home",
    children: [
      {
        id: "Home",
        icon: <HomeIcon />,
        route: "/",
      },
    ],
  },
  {
    id: "Main Section",
    children: [
      { id: "Login", icon: <LoginIcon />, route: "/login" },
      { id: "Staking", icon: <SavingsIcon />, route: "/staking" },
    ],
  },
];

const AppDrawer = ({ drawerWidth }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const moveToPage = (route) => navigate(route);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: "var(--mainColor-Nav)",
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />

      <Box
        sx={{
          overflow: "auto",
          backgroundColor: "var(--mainColor-Nav)",
          height: "100%",
          weight: "230px",
          marginTop: "18.5px",
        }}
      >
        <List>
          {drawerItems.map(({ id, children }) => (
            <Box key={id}>
              {children.map(({ id: childId, icon, route }) => (
                <ListItem key={childId} disablePadding>
                  <ListItemButton onClick={() => moveToPage(route)} selected={route === pathname} sx={item}>
                    <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ m: 2, bgcolor: "rgba(255, 255, 255, 0.7)" }} />
            </Box>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const item = {
  py: 1,
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
  "&.Mui-selected": { bgcolor: "var(--mainColor-Nav)", color: "#fff" },
};

export default AppDrawer;
