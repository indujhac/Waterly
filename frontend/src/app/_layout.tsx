import { HydrationProvider } from "@/src/context/HydrationContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import { AuthProvider, useAuth } from "@/src/context/authContext";
import { hasCompletedOnboarding } from "@/src/utils/tokenStorage";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";

function AuthNavigation() {
  const { authStatus } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [onboardingCompleted, setOnboardingCompletedState] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const completed = await hasCompletedOnboarding();

      setOnboardingCompletedState(completed);
      setOnboardingChecked(true);
    };

    checkOnboarding();
  }, [segments]);

  useEffect(() => {
    if (!onboardingChecked || authStatus === "loading") {
      return;
    }

    const inOnboarding = segments[0] === "onboarding";

    const inAuthScreen = segments[0] === "login" || segments[0] === "register";

    // Show onboarding only on the first launch.
    if (!onboardingCompleted) {
      if (!inOnboarding) {
        router.replace("/onboarding");
      }

      return;
    }

    // Normal authentication routing.
    if (authStatus === "unauthenticated" && !inAuthScreen) {
      router.replace("/login");
    }

    if (authStatus === "authenticated" && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [authStatus, segments, onboardingChecked, onboardingCompleted]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <HydrationProvider>
        <ThemeProvider>
          <AuthNavigation />
        </ThemeProvider>
      </HydrationProvider>
    </AuthProvider>
  );
}
