import React, { useEffect } from "react";
import CircleChart from "../components/chart/CircleChart";
import { Box, Typography } from "@mui/material";
import Calendar from "../components/calendar/Calendar";
import useAccount from "../store/account";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { account } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      alert("Please Login with Metamask");
      navigate("/login");
    }
  });
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "500",
          letterSpacing: "1px",
          margin: "15px 15px 0px 15px",
        }}
      >
        Monthly Transaction Status
      </Typography>
      <Box display="flex">
        <Box width="50%" sx={{ margin: "10px" }}>
          <Calendar />
        </Box>
        <Box width="50%" sx={{ margin: "10px" }}>
          <CircleChart />
        </Box>
      </Box>
    </>
  );
};

export default Home;
