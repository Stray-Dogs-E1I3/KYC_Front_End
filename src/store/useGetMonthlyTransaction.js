import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useGetMonthlyTransaction = create(
  persist(
    (set) => ({
      monthlyTx: null,
      getMonthlyTransaction: async (day, token) => {
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
        };

        try {
          const result = await axios.get(`${process.env.REACT_APP_API_URL}/transaction/main/${day}`, { headers });
          const { data } = result;
          set((state) => ({ ...state, monthlyTx: data }));
        } catch (error) {
          console.error("Error in getMonthlyTransaction:", error);
        }
      },
    }),
    { name: "monthlyTransaction" }
  )
);

export default useGetMonthlyTransaction;
