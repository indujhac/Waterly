import { createContext, useContext, useState } from "react";

type HydrationContextValue = {
  waterAmount: number;
  dailyGoal: number;
  addDrink: (amount: number) => void;
};

const HydrationContext = createContext<HydrationContextValue | undefined>(
  undefined,
);
export function HydrationProvider({ children }: { children: React.ReactNode }) {
  const [waterAmount, setWaterAmount] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);

  const addDrink = (amount: number) => {
    setWaterAmount((current) => {
      const newAmount = current + amount;
      return newAmount;
    });
  };
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
