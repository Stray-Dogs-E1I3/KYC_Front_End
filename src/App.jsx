import React from "react";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { Box } from "@mui/system";
import AppHeader from "./components/layout/AppHeader";
import AppDrawer from "./components/layout/AppDrawer";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Staking from "./pages/staking/Staking";

const App = () => (
  <>
    <Box sx={{ display: "flex" }}>
      <AppHeader />
      <AppDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "155px",
          marginTop: "78px",
          bgcolor: "#f2f7fb",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="staking" element={<Staking />} />
        </Routes>
      </Box>
    </Box>
  </>
);

export default App;
