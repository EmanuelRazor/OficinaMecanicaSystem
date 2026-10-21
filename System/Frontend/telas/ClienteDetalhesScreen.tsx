import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import InfoRow from "../components/InfoRow";
import { api, mensagemDeErro } from "../services/api";
import type { Cliente } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ClienteDetalhes">;

export default function ClienteDetalhesScreen({ navigation, route }: Props) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      setCliente(await api.obterCliente(route.params.id));
    } catch (error) {
      setErro(mensagemDeErro(error));
    } finally {
      setLoading(false);
    }
  }, [route.params.id]);

  useFocusEffect(
    useCallback(() => {
      void carregar();
    }, [carregar]),
  );

  if (loading && !cliente) return <FeedbackState loading message="Carregando cliente..." />;
  if (erro && !cliente) return <FeedbackState message={erro} onRetry={() => void carregar()} />;
  if (!cliente) return <FeedbackState message="Cliente não encontrado." />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }}>
      <Text className="mb-4 text-2xl font-bold text-slate-900">{cliente.nome}</Text>

      <View className="mb-5 rounded-2xl border border-slate-200 bg-white px-4">
        <InfoRow label="ID" value={cliente.id} />
        <InfoRow label="Nome" value={cliente.nome} />
        <InfoRow label="E-mail" value={cliente.email} />
        <InfoRow label="Telefone" value={cliente.telefone} />
      </View>

      <View className="mb-3">
        <ActionButton
          title="Editar cliente"
          variant="secondary"
          onPress={() => navigation.navigate("ClienteEditar", { id: cliente.id })}
        />
      </View>
      <ActionButton
        title="Excluir cliente"
        variant="danger"
        onPress={() => navigation.navigate("ClienteExcluir", { id: cliente.id })}
      />
    </ScrollView>
  );
}
