import { createContext, useContext, useEffect, useState } from "react";
import { getTodayHydration, updateTodayHydration } from "../api/api";
import { useAuth } from "./authContext";

type HydrationContextValue = {
  waterAmount: number;
  dailyGoal: number;
  addDrink: (amount: number) => void;
};

const HydrationContext = createContext<HydrationContextValue | undefined>(
  undefined,
);
export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const { user, authStatus } = useAuth();
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);

  const addDrink = async (amount: number) => {
    const newAmount = waterAmount + amount;
    setWaterAmount(newAmount);
    try {
      await updateTodayHydration(newAmount);
    } catch (error) {
      console.error("Failed to update hydration:", error);
    }
  };

  useEffect(() => {
    const loadHydration = async () => {
      if (authStatus !== "authenticated" || !user) {
        return;
      }

      try {
        const data = await getTodayHydration();
        setWaterAmount(data.waterAmount);
        setDailyGoal(data.dailyGoal);
      } catch (error) {
        console.error("Failed to load hydration:", error);
      }
    };

    loadHydration();
  }, [authStatus, user]);

  return (
    <HydrationContext.Provider
      value={{
        waterAmount,
        dailyGoal,
        addDrink,
      }}
    >
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration() {
  const context = useContext(HydrationContext);
  if (!context) {
    throw new Error("useHydration must be inside the HydrationProvider");
  }
  return context;
}
