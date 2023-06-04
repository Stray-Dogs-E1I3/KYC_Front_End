import { Box } from "@mui/material";
import Faucet from "../../components/staking/Faucet";
import ReceiveReward from "../../components/staking/ReceiveReward";
import StakingToken from "../../components/staking/StakingToken";
import React from "react";

const Staking = () => {
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Faucet />
      </Box>
      <Box display="flex">
        <Box
          width="50%"
          sx={{
            display: "flex",
            height: "75vh",
            margin: "20px",
            borderRight: "1px solid",
          }}
        >
          <StakingToken />
        </Box>
        <Box
          width="50%"
          sx={{
            display: "flex",
            height: "75vh",
            margin: "20px",
          }}
        >
          <ReceiveReward />
        </Box>
      </Box>
    </Box>
  );
};

export default Staking;
