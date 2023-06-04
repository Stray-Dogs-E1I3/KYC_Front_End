import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAccount = create(
  persist(
    (set) => ({
      account: null,
      token: null,
      setAccount: async (account) => {
        set((state) => ({ ...state, account }));
        try {
          const postAddress = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, { userAddress: account });
          console.log(postAddress);
          set((state) => ({ ...state, token: postAddress.data }));
        } catch (error) {
          console.error(error);
        }
      },
      logOut: () => set(() => ({ account: null })),
    }),
    {
      name: "account",
    }
  )
);

export default useAccount;
