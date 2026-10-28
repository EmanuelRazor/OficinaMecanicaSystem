import { Platform } from "react-native";

const API_PADRAO =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000"
    : "http://localhost:3000";

const apiConfigurada = process.env.EXPO_PUBLIC_API_URL?.trim();

export const API_URL = (apiConfigurada || API_PADRAO).replace(/\/+$/, "");
