import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { faucetToken, getTokenBalance } from "../../utils/web3/web3";
import useAccount from "../../store/account";
import { useNavigate } from "react-router-dom";

const Faucet = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const [tokenBalance, setTokenBalance] = useState(0);

  const faucet = async () => {
    await faucetToken(account);
  };

  const getBalance = async (account) => {
    const balance = await getTokenBalance(account);
    setTokenBalance(balance);
  };

  useEffect(() => {
    if (account) {
      getBalance(account);
    } else {
      navigate("/login");
    }
  }, [account]);
  return (
    <>
      <Button
        variant="contained"
        sx={{ backgroundColor: "var(--mainColor-Nav)", margin: "20px" }}
        onClick={faucet}
      >
        Faucet Token
      </Button>
      <Box sx={{ fontWeight: "bold", marginTop: "25px", fontSize: "20px" }}>
        My Token Amount : {tokenBalance}
      </Box>
    </>
  );
};

export default Faucet;
