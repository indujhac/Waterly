import { HydrationProvider } from "@/src/context/HydrationContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { AuthProvider } from "../context/authContext";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <HydrationProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </HydrationProvider>
    </AuthProvider>
  );
}
