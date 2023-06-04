import Web3 from "web3";
import KYCToken from "./artifacts/KYCToken.json";
import StakingRewards from "./artifacts/StakingRewards.json";

export const web3 = new Web3(window.ethereum);

const KYCTokenABI = KYCToken.abi;
export const KYCTokenAddress = KYCToken.contractAddress;

const StakingRewardsABI = StakingRewards.abi;
export const StakingRewardsAddress = StakingRewards.contractAddress;

export const KYCTokenContract = new web3.eth.Contract(
  KYCTokenABI,
  KYCTokenAddress
);

export const StakingRewardsContract = new web3.eth.Contract(
  StakingRewardsABI,
  StakingRewardsAddress
);

export const getTokenBalance = async (account) => {
  const balance = await KYCTokenContract.methods.balanceOf(account).call();
  return balance;
};

export const faucetToken = async (account) => {
  const result = await KYCTokenContract.methods
    .faucetToken()
    .send({ from: account });
  console.log(result);
};

export const stakeToken = async (account, amount) => {
  const approved = await KYCTokenContract.methods
    .approve(StakingRewardsAddress, amount)
    .send({ from: account });
  console.log("appp", approved);

  if (true) {
    const staking = await StakingRewardsContract.methods
      .stake(amount)
      .send({ from: account });
    console.log("cont staking", staking);
  }
};

export const getTotalStakingBalance = async (account) => {
  const totalSupply = await StakingRewardsContract.methods
    .balanceOf(account)
    .call();
  return totalSupply;
};

export const withdrawSupply = async (account, amount) => {
  const withdraw = await StakingRewardsContract.methods
    .withdraw(amount)
    .send({ from: account });
  console.log("const withdraw", withdraw);
};

export const receiveRewardToken = async (account) => {
  const getReward = await StakingRewardsContract.methods
    .getReward()
    .send({ from: account });
  console.log("const getReward", getReward);
};

export const getRewardRate = async () => {
  const getRewardRate = await StakingRewardsContract.methods
    .rewardRate()
    .call();
  return getRewardRate;
};

export const getEarned = async (account) => {
  const getEarnedToken = await StakingRewardsContract.methods
    .earned(account)
    .call();
  return getEarnedToken;
};
