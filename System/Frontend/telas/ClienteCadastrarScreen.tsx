import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, Text } from "react-native";

import ActionButton from "../components/ActionButton";
import FormField from "../components/FormField";
import { api, mensagemDeErro } from "../services/api";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ClienteCadastrar">;

export default function ClienteCadastrarScreen({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [saving, setSaving] = useState(false);

  async function salvar() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Campos obrigatórios", "Informe o nome e o e-mail do cliente.");
      return;
    }

    setSaving(true);
    try {
      await api.criarCliente({
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim() || undefined,
      });
      Alert.alert("Sucesso", "Cliente cadastrado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro ao cadastrar", mensagemDeErro(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerStyle={{ padding: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="mb-5 text-base text-slate-600">
        Preencha os dados para executar o POST /clientes.
      </Text>

      <FormField label="Nome" required value={nome} onChangeText={setNome} autoCapitalize="words" />
      <FormField
        label="E-mail"
        required
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <FormField
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <ActionButton title="Cadastrar cliente" onPress={() => void salvar()} loading={saving} />
    </ScrollView>
  );
}
