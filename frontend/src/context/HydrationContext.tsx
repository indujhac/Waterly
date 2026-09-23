import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
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

  const addDrink = (amount: number) => {
    setWaterAmount((current) => {
      const newAmount = current + amount;

      if (user) {
        const key = `hydration_${user.id}`;

        SecureStore.setItemAsync(
          key,
          JSON.stringify({
            date: new Date().toISOString().split("T")[0],
            waterAmount: newAmount,
          }),
        );
      }

      return newAmount;
    });
  };

  useEffect(() => {
    const loadHydration = async () => {
      if (authStatus !== "authenticated" || !user) {
        return;
      }

      const key = `hydration_${user.id}`;

      const savedData = await SecureStore.getItemAsync(key);

      if (!savedData) {
        return;
      }

      const parsedData = JSON.parse(savedData);

      if (parsedData.date === new Date().toISOString().split("T")[0]) {
        setWaterAmount(parsedData.waterAmount);
      } else {
        setWaterAmount(0);
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
