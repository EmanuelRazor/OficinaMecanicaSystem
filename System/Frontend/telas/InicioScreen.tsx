import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Inicio">;

export default function InicioScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <View className="flex-1 px-6 py-8">
        <Text className="text-3xl font-bold text-slate-900">Oficina Mecânica</Text>
        <Text className="mb-8 mt-2 text-base text-slate-600">
          Gerencie clientes, veículos e ordens de serviço.
        </Text>

        <TouchableOpacity
          className="mb-4 rounded-2xl bg-blue-600 p-5"
          onPress={() => navigation.navigate("ClientesLista")}
          activeOpacity={0.85}
        >
          <Text className="text-xl font-bold text-white">Clientes</Text>
          <Text className="mt-1 text-blue-100">Cadastro, consulta, edição e exclusão.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-4 rounded-2xl bg-emerald-600 p-5"
          onPress={() => navigation.navigate("VeiculosLista")}
          activeOpacity={0.85}
        >
          <Text className="text-xl font-bold text-white">Veículos</Text>
          <Text className="mt-1 text-emerald-100">Veículos vinculados aos clientes.</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="rounded-2xl bg-orange-500 p-5"
          onPress={() => navigation.navigate("OrdensLista")}
          activeOpacity={0.85}
        >
          <Text className="text-xl font-bold text-white">Ordens de Serviço</Text>
          <Text className="mt-1 text-orange-100">Serviços, status e valores.</Text>
        </TouchableOpacity>

        <View className="mt-auto rounded-xl border border-slate-200 bg-white p-4">
          <Text className="text-sm text-slate-500">
            A API deve estar em execução na porta 3000. Ajuste o endereço em config/api.ts para o IP do computador.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
