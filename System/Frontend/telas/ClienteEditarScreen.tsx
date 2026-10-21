import { useEffect, useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, Text } from "react-native";

import ActionButton from "../components/ActionButton";
import FeedbackState from "../components/FeedbackState";
import FormField from "../components/FormField";
import { api, mensagemDeErro } from "../services/api";
import type { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "ClienteEditar">;

export default function ClienteEditarScreen({ navigation, route }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setLoading(true);
      setErro(null);
      try {
        const cliente = await api.obterCliente(route.params.id);
        if (!ativo) return;
        setNome(cliente.nome ?? "");
        setEmail(cliente.email ?? "");
        setTelefone(cliente.telefone ?? "");
      } catch (error) {
        if (ativo) setErro(mensagemDeErro(error));
      } finally {
        if (ativo) setLoading(false);
      }
    }

    void carregar();
    return () => {
      ativo = false;
    };
  }, [route.params.id]);

  async function salvar() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Campos obrigatórios", "Informe o nome e o e-mail do cliente.");
      return;
    }

    setSaving(true);
    try {
      await api.atualizarCliente(route.params.id, {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim() || undefined,
      });
      Alert.alert("Sucesso", "Cliente atualizado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erro ao atualizar", mensagemDeErro(error));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <FeedbackState loading message="Carregando cliente..." />;
  if (erro) return <FeedbackState message={erro} />;

  return (
    <ScrollView className="flex-1 bg-slate-100" contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
      <Text className="mb-5 text-base text-slate-600">Altere os dados para executar o PUT /clientes/:id.</Text>
      <FormField label="Nome" required value={nome} onChangeText={setNome} autoCapitalize="words" />
      <FormField label="E-mail" required value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <FormField label="Telefone" value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
      <ActionButton title="Salvar alterações" onPress={() => void salvar()} loading={saving} />
    </ScrollView>
  );
}
