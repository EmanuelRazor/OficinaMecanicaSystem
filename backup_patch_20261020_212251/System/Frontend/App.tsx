import "./global.css";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import ClientesListScreen from "./telas/ClientesListScreen";
import InicioScreen from "./telas/InicioScreen";

type RootStackParamList = {
  Inicio: undefined;
  ClientesLista: undefined;
  ClienteCadastrar: undefined;
  VeiculosLista: undefined;
  OrdensLista: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function TelaEmDesenvolvimento({ titulo }: { titulo: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100 px-6">
      <Text className="text-center text-2xl font-bold text-slate-900">
        {titulo}
      </Text>
      <Text className="mt-3 text-center text-base text-slate-600">
        Esta tela ainda está em desenvolvimento.
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />

      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#f1f5f9",
          },
          headerTintColor: "#0f172a",
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: "#f1f5f9",
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClientesLista"
          component={ClientesListScreen}
          options={{ title: "Clientes" }}
        />

        <Stack.Screen
          name="ClienteCadastrar"
          options={{ title: "Novo Cliente" }}
        >
          {() => <TelaEmDesenvolvimento titulo="Cadastro de Cliente" />}
        </Stack.Screen>

        <Stack.Screen name="VeiculosLista" options={{ title: "Veículos" }}>
          {() => <TelaEmDesenvolvimento titulo="Veículos" />}
        </Stack.Screen>

        <Stack.Screen
          name="OrdensLista"
          options={{ title: "Ordens de Serviço" }}
        >
          {() => <TelaEmDesenvolvimento titulo="Ordens de Serviço" />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
