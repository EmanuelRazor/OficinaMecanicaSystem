import "./global.css";

import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Text className="text-2xl font-bold text-blue-600">
        Oficina Mecânica
      </Text>

      <Text className="mt-2 text-slate-600">
        NativeWind funcionando!
      </Text>
    </View>
  );
}