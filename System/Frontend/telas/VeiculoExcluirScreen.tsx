import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, Text, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import { api, mensagemDeErro } from "../services/api";
import type { Veiculo } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "VeiculoExcluir">;

export default function VeiculoExcluirScreen({ navigation, route }: Props) {
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    api.obterVeiculo(route.params.id)
      .then((dados) => ativo && setVeiculo(dados))
      .catch((error) => ativo && setErro(mensagemDeErro(error)))
      .finally(() => ativo && setLoading(false));
    return () => { ativo = false; };
  }, [route.params.id]);

  async function excluir() {
    setDeleting(true);
    try {
      await api.excluirVeiculo(route.params.id);
      Alert.alert("Veículo excluído", "O registro foi removido.", [
        { text: "OK", onPress: () => navigation.navigate("VeiculosLista") },
      ]);
    } catch (error) {
      Alert.alert("Erro ao excluir", mensagemDeErro(error));
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <FeedbackState loading message="Carregando veículo..." />;
  if (erro) return <FeedbackState message={erro} />;
  if (!veiculo) return <FeedbackState message="Veículo não encontrado." />;

  return (
    <View className="flex-1 bg-slate-100 p-5">
      <View className="rounded-2xl border border-red-200 bg-white p-5">
        <Text className="text-xl font-bold text-slate-900">Excluir {veiculo.placa || veiculo.modelo}?</Text>
        <Text className="mt-3 text-base leading-6 text-slate-600">
          Esta tela executa DELETE /veiculos/:id. A exclusão não poderá ser desfeita.
        </Text>
      </View>
      <View className="mt-5">
        <ActionButton
          title="Confirmar exclusão"
          variant="danger"
          loading={deleting}
          onPress={() =>
            Alert.alert("Confirmar exclusão", "Deseja realmente excluir este veículo?", [
              { text: "Cancelar", style: "cancel" },
              { text: "Excluir", style: "destructive", onPress: () => void excluir() },
            ])
          }
        />
      </View>
    </View>
  );
}
