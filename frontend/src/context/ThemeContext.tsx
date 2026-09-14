// theme/ThemeContext.tsx

import React, { createContext, useContext, useMemo, useState } from "react";

import { AppTheme, ThemeName, themes } from "../theme/themes";

type ThemeMode = "auto" | ThemeName;

type ThemeContextValue = {
  theme: AppTheme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("pink");

  const theme = useMemo(() => {
    if (themeMode === "auto") {
      return themes.pink;
    }

    return themes[themeMode];
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return {
    colors: context.theme.colors,
    theme: context.theme,
    themeMode: context.themeMode,
    setThemeMode: context.setThemeMode,
  };
}
