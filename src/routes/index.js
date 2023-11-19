import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome'
import SignIn from '../pages/Signin'
import Home from "../pages/Home";

const Stack = createNativeStackNavigator();

export default function Routes(){

    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
            />

            <Stack.Screen
            name="SignIn"
            options={{headerShown: false}}
            component={({ navigation }) => <SignIn navigation={navigation} />}
            />

            <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
            />

        </Stack.Navigator>
            
    )
}