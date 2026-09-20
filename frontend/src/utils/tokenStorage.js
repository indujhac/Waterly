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
