import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import FormField from "../components/FormField";
import { api, mensagemDeErro } from "../services/api";
import type { Cliente } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "VeiculoEditar">;

export default function VeiculoEditarScreen({ navigation, route }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      setLoading(true);
      try {
        const [veiculo, listaClientes] = await Promise.all([
          api.obterVeiculo(route.params.id),
          api.listarClientes().catch(() => [] as Cliente[]),
        ]);
        if (!ativo) return;
        setClientes(listaClientes);
        setClienteId(veiculo.clienteId ?? "");
        setMarca(veiculo.marca ?? "");
        setModelo(veiculo.modelo ?? "");
        setPlaca(veiculo.placa ?? "");
        setAno(veiculo.ano ?? "");
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
    if (!clienteId.trim() || !marca.trim() || !modelo.trim() || !placa.trim()) {
      Alert.alert("Campos obrigatórios", "Informe cliente, marca, modelo e placa.");
      return;
    }

    if (clientes.length > 0 && !clientes.some((cliente) => cliente.id === clienteId.trim())) {
      Alert.alert("Cliente inválido", "Selecione um cliente disponível na lista.");
      return;
    }

    setSaving(true);
    try {
      await api.atualizarVeiculo(route.params.id, {
        clienteId: clienteId.trim(),
        marca: marca.trim(),
        modelo: modelo.trim(),
        placa: placa.trim().toUpperCase(),
        ano: ano.trim() || undefined,
      });
      Alert.alert("Sucesso", "Veículo atualizado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro ao atualizar", mensagemDeErro(error));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <FeedbackState loading message="Carregando veículo..." />;
  if (erro) return <FeedbackState message={erro} />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      <Text className="mb-3 text-base text-slate-600">Altere os dados para executar PUT /veiculos/:id.</Text>
      <Text className="mb-2 font-semibold text-slate-700">Clientes disponíveis</Text>
      <View className="mb-4">
        {clientes.map((cliente) => (
          <TouchableOpacity
            key={cliente.id}
            className={clienteId === cliente.id ? "mb-2 rounded-xl border border-emerald-600 bg-emerald-50 p-3" : "mb-2 rounded-xl border border-slate-200 bg-white p-3"}
            onPress={() => setClienteId(cliente.id)}
          >
            <Text className="font-semibold text-slate-900">{cliente.nome}</Text>
            <Text className="text-xs text-slate-500">ID: {cliente.id}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FormField label="ID do cliente" required value={clienteId} onChangeText={setClienteId} />
      <FormField label="Marca" required value={marca} onChangeText={setMarca} autoCapitalize="words" />
      <FormField label="Modelo" required value={modelo} onChangeText={setModelo} autoCapitalize="words" />
      <FormField label="Placa" required value={placa} onChangeText={(texto) => setPlaca(texto.toUpperCase())} autoCapitalize="characters" />
      <FormField label="Ano" value={ano} onChangeText={setAno} keyboardType="number-pad" />
      <ActionButton title="Salvar alterações" variant="success" onPress={() => void salvar()} loading={saving} />
    </ScrollView>
  );
}
