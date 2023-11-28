import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../pages/Welcome";
import SignIn from "../pages/Signin";
import Home from "../pages/Home/menu";
import FuncionariosView from "../pages/Home/GerenciarFuncionarios";
import GerarHolerite from "../pages/Home/GerarHolerite";
import GerarContrato from "../pages/Home/GerarContrato";
import Suporte from "../pages/Home/Suporte";
import GerarRelatorio from "../pages/Home/GerarRelatorio";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="SignIn" options={{ headerShown: false }}>
        {({ navigation }) => <SignIn navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        name="FuncionariosView"
        options={{ title: 'Funcionários' }}
      >
        {({ navigation }) => <FuncionariosView navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        name="GerarHolerite"
        options={{ title: 'Gerar Holerite' }}
      >
        {({ navigation }) => <GerarHolerite navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        name="GerarContrato"
        options={{ title: 'Gerar Contrato' }}
      >
        {({ navigation }) => <GerarContrato navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        name="GerarRelatorio"
        options={{ title: 'Gerar Relatório' }}
      >
        {({ navigation }) => <GerarRelatorio navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen
        name="Suporte"
        options={{ title: 'Suporte' }}
      >
        {({ navigation }) => <Suporte navigation={navigation} />}
      </Stack.Screen>

      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
