import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { getTotalStakingBalance, web3 } from "../utils/web3/web3";

const useGetRequest = create((set) => ({
  stakeAmount: 0,
  rewardRate: 0,
  receiveAmount: 0,
  getAccountBalance: async (address) => {
    const accountBalance = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(accountBalance);
    return balance;
  },
  getStakeAmount: async (account) => {
    const staked = await getTotalStakingBalance(account);
    set((state) => ({ ...state, stakeAmount: staked }));
  },
  getRewardRate: async () => {
    const amount = await getTotalStakingBalance(account);
    set((state) => ({ ...state, rewardRate: amount }));
  },
  getReceiveAmount: async (account) => {
    const amount = await getTotalStakingBalance(account);
    set((state) => ({ ...state, receiveAmount: amount }));
  },
}));

export default useGetRequest;
