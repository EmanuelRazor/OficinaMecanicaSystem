import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import ClienteCadastrarScreen from "./telas/ClienteCadastrarScreen";
import ClienteDetalhesScreen from "./telas/ClienteDetalhesScreen";
import ClienteEditarScreen from "./telas/ClienteEditarScreen";
import ClienteExcluirScreen from "./telas/ClienteExcluirScreen";
import ClientesListScreen from "./telas/ClientesListScreen";
import InicioScreen from "./telas/InicioScreen";
import OrdemCadastrarScreen from "./telas/OrdemCadastrarScreen";
import OrdemDetalhesScreen from "./telas/OrdemDetalhesScreen";
import OrdemEditarScreen from "./telas/OrdemEditarScreen";
import OrdemExcluirScreen from "./telas/OrdemExcluirScreen";
import OrdensListScreen from "./telas/OrdensListScreen";
import VeiculoCadastrarScreen from "./telas/VeiculoCadastrarScreen";
import VeiculoDetalhesScreen from "./telas/VeiculoDetalhesScreen";
import VeiculoEditarScreen from "./telas/VeiculoEditarScreen";
import VeiculoExcluirScreen from "./telas/VeiculoExcluirScreen";
import VeiculosListScreen from "./telas/VeiculosListScreen";
import type { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f1f5f9" },
          headerTintColor: "#0f172a",
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: "#f1f5f9" },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="ClientesLista" component={ClientesListScreen} options={{ title: "Clientes" }} />
        <Stack.Screen name="ClienteDetalhes" component={ClienteDetalhesScreen} options={{ title: "Detalhes do cliente" }} />
        <Stack.Screen name="ClienteCadastrar" component={ClienteCadastrarScreen} options={{ title: "Novo cliente" }} />
        <Stack.Screen name="ClienteEditar" component={ClienteEditarScreen} options={{ title: "Editar cliente" }} />
        <Stack.Screen name="ClienteExcluir" component={ClienteExcluirScreen} options={{ title: "Excluir cliente" }} />

        <Stack.Screen name="VeiculosLista" component={VeiculosListScreen} options={{ title: "Veículos" }} />
        <Stack.Screen name="VeiculoDetalhes" component={VeiculoDetalhesScreen} options={{ title: "Detalhes do veículo" }} />
        <Stack.Screen name="VeiculoCadastrar" component={VeiculoCadastrarScreen} options={{ title: "Novo veículo" }} />
        <Stack.Screen name="VeiculoEditar" component={VeiculoEditarScreen} options={{ title: "Editar veículo" }} />
        <Stack.Screen name="VeiculoExcluir" component={VeiculoExcluirScreen} options={{ title: "Excluir veículo" }} />

        <Stack.Screen name="OrdensLista" component={OrdensListScreen} options={{ title: "Ordens de serviço" }} />
        <Stack.Screen name="OrdemDetalhes" component={OrdemDetalhesScreen} options={{ title: "Detalhes da ordem" }} />
        <Stack.Screen name="OrdemCadastrar" component={OrdemCadastrarScreen} options={{ title: "Nova ordem" }} />
        <Stack.Screen name="OrdemEditar" component={OrdemEditarScreen} options={{ title: "Editar ordem" }} />
        <Stack.Screen name="OrdemExcluir" component={OrdemExcluirScreen} options={{ title: "Excluir ordem" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
