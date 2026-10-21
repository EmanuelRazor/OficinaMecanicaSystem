import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import InfoRow from "../components/InfoRow";
import { api, mensagemDeErro } from "../services/api";
import type { Cliente, Veiculo } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "VeiculoDetalhes">;

export default function VeiculoDetalhesScreen({ navigation, route }: Props) {
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await api.obterVeiculo(route.params.id);
      setVeiculo(dados);
      try {
        setCliente(await api.obterCliente(dados.clienteId));
      } catch {
        setCliente(null);
      }
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

  if (loading && !veiculo) return <FeedbackState loading message="Carregando veículo..." />;
  if (erro && !veiculo) return <FeedbackState message={erro} onRetry={() => void carregar()} />;
  if (!veiculo) return <FeedbackState message="Veículo não encontrado." />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }}>
      <Text className="mb-4 text-2xl font-bold text-slate-900">{veiculo.placa || "Veículo"}</Text>
      <View className="mb-5 rounded-2xl border border-slate-200 bg-white px-4">
        <InfoRow label="ID" value={veiculo.id} />
        <InfoRow label="Placa" value={veiculo.placa} />
        <InfoRow label="Marca" value={veiculo.marca} />
        <InfoRow label="Modelo" value={veiculo.modelo} />
        <InfoRow label="Ano" value={veiculo.ano} />
        <InfoRow label="Cliente" value={cliente?.nome ?? veiculo.clienteId} />
        <InfoRow label="ID do cliente" value={veiculo.clienteId} />
      </View>

      <View className="mb-3">
        <ActionButton title="Editar veículo" variant="secondary" onPress={() => navigation.navigate("VeiculoEditar", { id: veiculo.id })} />
      </View>
      <ActionButton title="Excluir veículo" variant="danger" onPress={() => navigation.navigate("VeiculoExcluir", { id: veiculo.id })} />
    </ScrollView>
  );
}
