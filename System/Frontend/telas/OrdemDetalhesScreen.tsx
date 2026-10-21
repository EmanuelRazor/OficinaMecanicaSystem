import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import InfoRow from "../components/InfoRow";
import { api, mensagemDeErro } from "../services/api";
import type { OrdemServico, Veiculo } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "OrdemDetalhes">;

export default function OrdemDetalhesScreen({ navigation, route }: Props) {
  const [ordem, setOrdem] = useState<OrdemServico | null>(null);
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await api.obterOrdem(route.params.id);
      setOrdem(dados);
      if (dados.veiculoId) {
        try {
          setVeiculo(await api.obterVeiculo(dados.veiculoId));
        } catch {
          setVeiculo(null);
        }
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

  if (loading && !ordem) return <FeedbackState loading message="Carregando ordem..." />;
  if (erro && !ordem) return <FeedbackState message={erro} onRetry={() => void carregar()} />;
  if (!ordem) return <FeedbackState message="Ordem de serviço não encontrada." />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }}>
      <Text className="mb-4 text-2xl font-bold text-slate-900">Ordem de Serviço</Text>
      <View className="mb-5 rounded-2xl border border-slate-200 bg-white px-4">
        <InfoRow label="ID" value={ordem.id} />
        <InfoRow label="Descrição" value={ordem.descricao} />
        <InfoRow label="Status" value={ordem.status} />
        <InfoRow label="Valor" value={ordem.valor !== undefined && ordem.valor !== "" ? `R$ ${ordem.valor}` : undefined} />
        <InfoRow label="Veículo" value={veiculo ? `${veiculo.placa} - ${veiculo.marca} ${veiculo.modelo}` : ordem.veiculoId} />
        <InfoRow label="ID do veículo" value={ordem.veiculoId} />
      </View>

      <View className="mb-3">
        <ActionButton title="Editar ordem" variant="secondary" onPress={() => navigation.navigate("OrdemEditar", { id: ordem.id })} />
      </View>
      <ActionButton title="Excluir ordem" variant="danger" onPress={() => navigation.navigate("OrdemExcluir", { id: ordem.id })} />
    </ScrollView>
  );
}
