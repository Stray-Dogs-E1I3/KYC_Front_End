import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useGetDailyTransaction = create(
  persist(
    (set) => ({
      dailyTx: null,
      getDailyTransaction: async (day, token) => {
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
        };

        try {
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/transaction/daily/${day}`, { headers });
          const { data } = result;
          set((state) => ({ ...state, dailyTx: data }));
        } catch (error) {
          console.error("Error in getDailyTransaction:", error);
        }
      },
    }),
    { name: "dailyTransaction" }
  )
);

export default useGetDailyTransaction;
