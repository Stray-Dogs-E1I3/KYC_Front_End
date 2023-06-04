import { Box, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  getEarned,
  getRewardRate,
  getTotalStakingBalance,
  receiveRewardToken,
} from "../../utils/web3/web3";
import useAccount from "../../store/account";

const ReceiveReward = () => {
  const { account } = useAccount();
  const [earnToken, setEarnToken] = useState(0.0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [rewardRate, setRewardRate] = useState(0);

  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const getReward = async (account) => {
    const reward = await receiveRewardToken(account);
    console.log("reward...", reward);
  };

  const getEarnedToken = async (account) => {
    const earnedToken = await getEarned(account);
    setEarnToken(parseInt(earnedToken), 10);
  };

  const getTotalSupply = async (account) => {
    const totalSupply = await getTotalStakingBalance(account);
    setTotalSupply(parseInt(totalSupply), 10);
    const rewardRates = await getRewardRate();
    setRewardRate(rewardRates);
  };

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      if (rewardRate !== 0) {
        const deltaTime = time - previousTimeRef.current;
        setEarnToken((prevCount) => prevCount + deltaTime * 0.001 * rewardRate); // 0.001을 곱해 숫자가 너무 빨리 증가하지 않게 합니다.
      } else {
        const deltaTime = time - previousTimeRef.current;
        setEarnToken((prevCount) => prevCount + deltaTime * 0.001); // 0.001을 곱해 숫자가 너무 빨리 증가하지 않게 합니다.
      }
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (account) {
      getEarnedToken(account);
      getTotalSupply(account);
    }
  }, [account]);

  useEffect(() => {
    if (totalSupply !== 0) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [totalSupply, earnToken]);

  return (
    <Box>
      <Box
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Receive Token : {earnToken.toFixed(2)}
        {/* {typeof earnToken === "number" ? earnToken.toFixed(2) : "Loading..."} */}
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "var(--mainColor-Nav)" }}
          onClick={() => getReward(account)}
        >
          Receive
        </Button>
      </Box>
    </Box>
  );
};

export default ReceiveReward;
