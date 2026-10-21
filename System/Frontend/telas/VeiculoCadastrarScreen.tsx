import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ActionButton from "../components/ActionButton";
import FormField from "../components/FormField";
import { api, mensagemDeErro } from "../services/api";
import type { Cliente } from "../types/models";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "VeiculoCadastrar">;

export default function VeiculoCadastrarScreen({ navigation }: Props) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.listarClientes().then(setClientes).catch(() => setClientes([]));
  }, []);

  async function salvar() {
    if (!clienteId.trim() || !marca.trim() || !modelo.trim() || !placa.trim()) {
      Alert.alert("Campos obrigatórios", "Selecione um cliente e informe marca, modelo e placa.");
      return;
    }

    if (clientes.length > 0 && !clientes.some((cliente) => cliente.id === clienteId.trim())) {
      Alert.alert("Cliente inválido", "Selecione um cliente disponível na lista.");
      return;
    }

    setSaving(true);
    try {
      await api.criarVeiculo({
        clienteId: clienteId.trim(),
        marca: marca.trim(),
        modelo: modelo.trim(),
        placa: placa.trim().toUpperCase(),
        ano: ano.trim() || undefined,
      });
      Alert.alert("Sucesso", "Veículo cadastrado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro ao cadastrar", mensagemDeErro(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      <Text className="mb-3 text-base text-slate-600">Selecione o proprietário e preencha os dados para executar POST /veiculos.</Text>

      <Text className="mb-2 font-semibold text-slate-700">Clientes disponíveis *</Text>
      {clientes.length === 0 ? (
        <View className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <Text className="text-sm text-amber-800">Nenhum cliente encontrado. Cadastre um cliente antes do veículo.</Text>
        </View>
      ) : (
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
      )}

      <FormField label="ID do cliente" required value={clienteId} onChangeText={setClienteId} helperText="É preenchido automaticamente ao selecionar um cliente acima." />
      <FormField label="Marca" required value={marca} onChangeText={setMarca} autoCapitalize="words" />
      <FormField label="Modelo" required value={modelo} onChangeText={setModelo} autoCapitalize="words" />
      <FormField label="Placa" required value={placa} onChangeText={(texto) => setPlaca(texto.toUpperCase())} autoCapitalize="characters" />
      <FormField label="Ano" value={ano} onChangeText={setAno} keyboardType="number-pad" />
      <ActionButton title="Cadastrar veículo" variant="success" onPress={() => void salvar()} loading={saving} />
    </ScrollView>
  );
}
