import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import { api, mensagemDeErro } from "../services/api";
import type { OrdemServico } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "OrdensLista">;

export default function OrdensListScreen({ navigation }: Props) {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);
    setErro(null);

    try {
      setOrdens(await api.listarOrdens());
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

  if (loading && ordens.length === 0) return <FeedbackState loading message="Carregando ordens..." />;
  if (erro && ordens.length === 0) return <FeedbackState message={erro} onRetry={() => void carregar()} />;

  return (
    <View className="flex-1 bg-slate-100 px-5 py-5">
      <View className="mb-5">
        <ActionButton title="Nova ordem de serviço" variant="warning" onPress={() => navigation.navigate("OrdemCadastrar")} />
      </View>

      {erro ? <Text className="mb-3 text-sm text-red-600">{erro}</Text> : null}

      <FlatList
        data={ordens}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => void carregar(true)} />}
        contentContainerStyle={ordens.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center text-base text-slate-500">
              Nenhuma ordem cadastrada. Cadastre um veículo antes de abrir uma ordem.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"
            onPress={() => navigation.navigate("OrdemDetalhes", { id: item.id })}
            activeOpacity={0.8}
          >
            <View className="flex-row items-start justify-between">
              <Text className="mr-3 flex-1 text-base font-bold text-slate-900" numberOfLines={2}>
                {item.descricao || "Ordem de serviço"}
              </Text>
              <Text className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                {item.status || "Aberta"}
              </Text>
            </View>
            <Text className="mt-2 text-xs text-slate-400">Veículo: {item.veiculoId || "não informado"}</Text>
            {item.valor !== undefined && item.valor !== "" ? (
              <Text className="mt-1 text-sm font-semibold text-slate-700">Valor: R$ {String(item.valor)}</Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
