import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import { api, mensagemDeErro } from "../services/api";
import type { Veiculo } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "VeiculosLista">;

export default function VeiculosListScreen({ navigation }: Props) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setErro(null);

    try {
      setVeiculos(await api.listarVeiculos());
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar]),
  );

  if (loading && veiculos.length === 0) return <FeedbackState loading message="Carregando veículos..." />;
  if (erro && veiculos.length === 0) return <FeedbackState message={erro} onRetry={() => void carregar()} />;

  return (
    <View className="flex-1 bg-slate-100 px-5 py-5">
      <View className="mb-5">
        <ActionButton title="Novo veículo" variant="success" onPress={() => navigation.navigate("VeiculoCadastrar")} />
      </View>

      {erro ? <Text className="mb-3 text-sm text-red-600">{erro}</Text> : null}

      <FlatList
        data={veiculos}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void carregar(true)} />}
        contentContainerStyle={veiculos.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center text-base text-slate-500">
              Nenhum veículo cadastrado. Cadastre primeiro um cliente e depois um veículo.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"
            onPress={() => navigation.navigate("VeiculoDetalhes", { id: item.id })}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-bold text-slate-900">{item.placa || "Sem placa"}</Text>
            <Text className="mt-1 text-sm text-slate-600">{[item.marca, item.modelo].filter(Boolean).join(" ") || "Veículo sem descrição"}</Text>
            <Text className="mt-1 text-xs text-slate-400">Cliente: {item.clienteId}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
