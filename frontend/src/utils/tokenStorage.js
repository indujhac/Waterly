import * as SecureStore from "expo-secure-store";

export const saveTokens = async (accessToken, refreshToken) => {
  await SecureStore.setItemAsync("accessToken", accessToken);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
};

export const getTokens = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  return {
    accessToken,
    refreshToken,
  };
};

export const clearTokens = async () => {
  await SecureStore.deleteItemAsync("accessToken");
  await SecureStore.deleteItemAsync("refreshToken");
};

export const setOnboardingCompleted = async () => {
  await SecureStore.setItemAsync("onboardingCompleted", "true");
};

export const hasCompletedOnboarding = async () => {
  const value = await SecureStore.getItemAsync("onboardingCompleted");

  return value === "true";
};

export const clearOnboarding = async () => {
  const value = await SecureStore.setItemAsync("onboardingCompleted", "false");
};
