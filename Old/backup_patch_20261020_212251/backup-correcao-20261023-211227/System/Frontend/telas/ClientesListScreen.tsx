import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import { api, mensagemDeErro } from "../services/api";
import type { Cliente } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ClientesLista">;

export default function ClientesListScreen({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const carregarClientes = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    else setLoading(true);

    setErro(null);

    try {
      setClientes(await api.listarClientes());
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void carregarClientes();
    }, [carregarClientes]),
  );

  if (loading && clientes.length === 0) {
    return <FeedbackState loading message="Carregando clientes..." />;
  }

  if (erro && clientes.length === 0) {
    return <FeedbackState message={erro} onRetry={() => void carregarClientes()} />;
  }

  return (
    <View className="flex-1 bg-slate-100 px-5 py-5">
      <View className="mb-5">
        <ActionButton title="Novo cliente" onPress={() => navigation.navigate("ClienteCadastrar")} />
      </View>

      {erro ? <Text className="mb-3 text-sm text-red-600">{erro}</Text> : null}

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void carregarClientes(true)} />
        }
        contentContainerStyle={clientes.length === 0 ? { flexGrow: 1 } : { paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center text-base text-slate-500">
              Nenhum cliente cadastrado. Toque em “Novo cliente” para começar.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mb-3 rounded-2xl border border-slate-200 bg-white p-4"
            onPress={() => navigation.navigate("ClienteDetalhes", { id: item.id })}
            activeOpacity={0.8}
          >
            <Text className="text-lg font-bold text-slate-900">{item.nome}</Text>
            <Text className="mt-1 text-sm text-slate-500">{item.email || "Sem e-mail"}</Text>
            {item.telefone ? <Text className="mt-1 text-sm text-slate-500">{item.telefone}</Text> : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
