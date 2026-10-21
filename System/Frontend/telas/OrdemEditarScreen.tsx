import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import FormField from "../components/FormField";
import { api, mensagemDeErro } from "../services/api";
import type { Veiculo } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "OrdemEditar">;

const STATUS = ["Aberta", "Em andamento", "Concluída"];

export default function OrdemEditarScreen({ navigation, route }: Props) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [veiculoId, setVeiculoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("Aberta");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      setLoading(true);
      try {
        const [ordem, listaVeiculos] = await Promise.all([
          api.obterOrdem(route.params.id),
          api.listarVeiculos().catch(() => [] as Veiculo[]),
        ]);
        if (!ativo) return;
        setVeiculos(listaVeiculos);
        setVeiculoId(ordem.veiculoId ?? "");
        setDescricao(ordem.descricao ?? "");
        setStatus(ordem.status || "Aberta");
        setValor(ordem.valor === undefined || ordem.valor === null ? "" : String(ordem.valor));
      } catch (error) {
        if (ativo) setErro(mensagemDeErro(error));
      } finally {
        if (ativo) setLoading(false);
      }
    }
    void carregar();
    return () => { ativo = false; };
  }, [route.params.id]);

  async function salvar() {
    if (!veiculoId.trim() || !descricao.trim()) {
      Alert.alert("Campos obrigatórios", "Informe o veículo e a descrição do serviço.");
      return;
    }

    if (veiculos.length > 0 && !veiculos.some((veiculo) => veiculo.id === veiculoId.trim())) {
      Alert.alert("Veículo inválido", "Selecione um veículo disponível na lista.");
      return;
    }

    const valorNormalizado = valor.trim().replace(",", ".");
    const numero = valorNormalizado ? Number(valorNormalizado) : undefined;
    if (valorNormalizado && Number.isNaN(numero)) {
      Alert.alert("Valor inválido", "Informe um valor numérico válido.");
      return;
    }

    setSaving(true);
    try {
      await api.atualizarOrdem(route.params.id, {
        veiculoId: veiculoId.trim(),
        descricao: descricao.trim(),
        status,
        valor: numero,
      });
      Alert.alert("Sucesso", "Ordem atualizada com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro ao atualizar", mensagemDeErro(error));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <FeedbackState loading message="Carregando ordem..." />;
  if (erro) return <FeedbackState message={erro} />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      <Text className="mb-3 text-base text-slate-600">Altere os dados para executar PUT /ordens-servico/:id.</Text>

      <Text className="mb-2 font-semibold text-slate-700">Veículos disponíveis</Text>
      <View className="mb-4">
        {veiculos.map((veiculo) => (
          <TouchableOpacity
            key={veiculo.id}
            className={veiculoId === veiculo.id ? "mb-2 rounded-xl border border-orange-500 bg-orange-50 p-3" : "mb-2 rounded-xl border border-slate-200 bg-white p-3"}
            onPress={() => setVeiculoId(veiculo.id)}
          >
            <Text className="font-semibold text-slate-900">{veiculo.placa || "Sem placa"} - {veiculo.marca} {veiculo.modelo}</Text>
            <Text className="text-xs text-slate-500">ID: {veiculo.id}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FormField label="ID do veículo" required value={veiculoId} onChangeText={setVeiculoId} />
      <FormField label="Descrição do serviço" required value={descricao} onChangeText={setDescricao} multiline numberOfLines={4} textAlignVertical="top" />

      <Text className="mb-2 font-semibold text-slate-700">Status</Text>
      <View className="mb-4 flex-row flex-wrap">
        {STATUS.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            className={status === opcao ? "mb-2 mr-2 rounded-full bg-orange-500 px-4 py-2" : "mb-2 mr-2 rounded-full bg-white px-4 py-2"}
            onPress={() => setStatus(opcao)}
          >
            <Text className={status === opcao ? "font-semibold text-white" : "font-semibold text-slate-700"}>{opcao}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FormField label="Valor (R$)" value={valor} onChangeText={setValor} keyboardType="decimal-pad" placeholder="0,00" />
      <ActionButton title="Salvar alterações" variant="warning" onPress={() => void salvar()} loading={saving} />
    </ScrollView>
  );
}
