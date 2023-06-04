import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useGetLogin = create(
  persist(
    (set) => ({
      getLoginRequest: async (address) => {
        try {
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
            userAddress: address,
          });
          const { data } = result;
          set({ ...state, token: data });
        } catch (error) {
          console.error("Error in getLoginRequest:", error);
        }
      },
    }),
    { name: "account" }
  )
);

export default useGetLogin;
