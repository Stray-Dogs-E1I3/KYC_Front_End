import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAccount from "../../store/account";
import {
  getRewardRate,
  getTotalStakingBalance,
  stakeToken,
  withdrawSupply,
} from "../../utils/web3/web3";
import { useNavigate } from "react-router-dom";
import useGetRequest from "../../store/useGetMethod";

const StakingToken = () => {
  const navigate = useNavigate();
  const { account } = useAccount();
  const [amount, setAmount] = useState(0);
  const [withdrawAmount, setWithDrawAmount] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [rewardRate, setRewardRate] = useState(0);

  const staking = async (account, amount) => {
    const stake = await stakeToken(account, amount);
    console.log("stake...", stake);
  };

  const withdrawToken = async (account, amount) => {
    const withdraw = await withdrawSupply(account, amount);
    console.log("withdraw...", withdraw);
  };

  const getTotalSupply = async (account) => {
    const totalSupply = await getTotalStakingBalance(account);
    const rewardRates = await getRewardRate();
    setTotalSupply(totalSupply);
    setRewardRate(rewardRates);
  };

  useEffect(() => {
    if (account) {
      getTotalSupply(account);
    } else {
      navigate("/login");
    }
  }, [account]);

  return (
    <Box>
      <Box
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Stake Token
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <TextField
          id="outlined-number"
          label="Input Token Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "10px" }}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--mainColor-Nav)", margin: "20px" }}
          onClick={() => staking(account, amount)}
        >
          Stake
        </Button>
      </Box>
      <Box sx={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}>
        <Box>Total Amount of Staking : {totalSupply}</Box>
        <Box sx={{ fontSize: "20px" }}>
          Reward to be paid out per second : {rewardRate}
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            id="outlined-number"
            label="Input Token Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginRight: "10px" }}
            onChange={(e) => {
              setWithDrawAmount(e.target.value);
            }}
          />

          <Button
            variant="contained"
            sx={{ backgroundColor: "var(--mainColor-Nav)", margin: "20px" }}
            onClick={() => withdrawToken(account, withdrawAmount)}
          >
            WITHDRAW
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default StakingToken;
