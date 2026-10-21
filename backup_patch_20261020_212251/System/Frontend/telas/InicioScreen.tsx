import { View, Text, TouchableOpacity } from "react-native";

export default function InicioScreen({ navigation }: any) {
  return (
    <View className="flex-1 bg-slate-100 p-6 pt-14">

      <Text className="mb-8 text-3xl font-bold text-slate-900">
        Oficina Mecânica
      </Text>

      <TouchableOpacity
        className="mb-4 rounded-xl bg-blue-600 p-4"
        onPress={() => navigation.navigate("ClientesLista")}
      >
        <Text className="text-center font-bold text-white">
          Clientes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mb-4 rounded-xl bg-emerald-600 p-4"
        onPress={() => navigation.navigate("VeiculosLista")}
      >
        <Text className="text-center font-bold text-white">
          Veículos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="rounded-xl bg-orange-500 p-4"
        onPress={() => navigation.navigate("OrdensLista")}
      >
        <Text className="text-center font-bold text-white">
          Ordens de Serviço
        </Text>
      </TouchableOpacity>

    </View>
  );
}