import React, { useEffect } from "react";
import Web3 from "web3";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAccount from "../../store/account";
import useGetLogin from "../../store/account";

function MetamaskButton() {
  const { account, setAccount } = useAccount();
  const { getLoginRequest } = useGetLogin();
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        getLoginRequest(accounts[0]);
        navigate("/");
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      console.error("Non-Ethereum browser detected. Please consider installing MetaMask!");
    }
  };

  useEffect(() => {
    if (account) {
      alert("You're already logged in.");
      navigate("/");
    }
  }, [account]);

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Button onClick={connectWallet} variant="contained" sx={{ bgcolor: "var(--mainColor-Nav)" }}>
        Connect Metamask
      </Button>
    </Box>
  );
}

export default MetamaskButton;
