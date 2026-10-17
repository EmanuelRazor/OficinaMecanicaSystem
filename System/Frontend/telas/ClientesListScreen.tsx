import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const API_URL = "http://192.168.1.50:3000";

export default function ClientesListScreen({ navigation }: any) {
  const [clientes, setClientes] = useState<any[]>([]);

  async function buscarClientes() {
    try {
      const resposta = await fetch(`${API_URL}/clientes`);

      const dados = await resposta.json();

      setClientes(dados);
    } catch (erro) {
      console.error("Erro ao buscar clientes:", erro);
    }
  }

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <View className="flex-1 bg-slate-100 p-6 pt-12">

      <Text className="mb-4 text-2xl font-bold text-slate-800">
        Lista de Clientes
      </Text>

      <TouchableOpacity
        className="mb-5 rounded-xl bg-blue-600 p-4"
        onPress={() => navigation.navigate("ClienteCadastrar")}
      >
        <Text className="text-center font-bold text-white">
          Novo Cliente
        </Text>
      </TouchableOpacity>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mb-3 rounded-xl border border-slate-200 bg-white p-4">

            <Text className="text-lg font-semibold text-slate-900">
              {item.nome}
            </Text>

            <Text className="text-sm text-slate-500">
              {item.email}
            </Text>

          </View>
        )}
      />

    </View>
  );
}