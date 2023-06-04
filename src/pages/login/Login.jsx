import React from "react";
import MetamaskButton from "../../components/metamask/Metamask";
import useGetRequest from "../../store/useGetMethod";
import { Box } from "@mui/material";

const Login = () => {
  const { getAccountBalance } = useGetRequest();
  const consolelog = () => {
    getAccountBalance();
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "90vh",
          width: "300px",
          fontSize: "20px",
          height: "200px",
        }}
      >
        Connect Wallet <MetamaskButton />
      </Box>
    </Box>
  );
};

export default Login;
